"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { Box, Typography, CircularProgress } from "@mui/material";
import { buildExpressionUrl } from "@/shared/builduri-expression";

export default function StructExpression({ geneData }) {
  const [exprData, setExprData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);

  const { response } = useMemo(
    () =>
      buildExpressionUrl({
        accession: geneData?.accession,
        organismId: geneData?.organism?.id,
      }),
    [geneData?.accession, geneData?.organism?.id]
  );

  useEffect(() => {
    if (!response) return;
    setLoading(true);
    fetch(response)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (json.status !== "success") throw new Error(json.message);
        setExprData(json.result);
        setErrorMsg(null);
      })
      .catch((err) => setErrorMsg(err.message))
      .finally(() => setLoading(false));
  }, [response]);

  useEffect(() => {
    if (!exprData || !containerRef.current) return;
    const resizeObserver = new ResizeObserver(() => drawChart());
    resizeObserver.observe(containerRef.current);

    function drawChart() {
      const width = containerRef.current.clientWidth;
      const transcripts = exprData.transcripts;
      const conditions = transcripts[0].expression.map((d) => d.condition);
      const values = transcripts.flatMap((t) =>
        t.expression.map((e) => e.value)
      );
      const yMax = d3.max(values) ?? 1;

      const maxIDLen = d3.max(transcripts, (t) => t.transcript_id.length);
      const marginLeft = maxIDLen * 8 + 20;
      const maxCondLen = d3.max(conditions, (c) => c.length);
      const marginBottom = maxCondLen * 6 + 40;
      const margin = {
        top: 30,
        right: 30,
        bottom: marginBottom,
        left: marginLeft,
      };

      const lineHeight = 300;
      const rowH = 30;
      const heatmapHeight = transcripts.length * rowH;
      const colorBarHeight = 20;
      const colorBarSpace = 60;
      const totalHeight =
        margin.top + lineHeight + colorBarSpace + heatmapHeight + margin.bottom;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();
      svg
        .attr("viewBox", `0 0 ${width} ${totalHeight}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

      const tooltip = d3.select(tooltipRef.current);

      // --- Línea ---
      const lineW = width - margin.left - margin.right;
      const xLine = d3
        .scalePoint()
        .domain(conditions)
        .range([0, lineW])
        .padding(0.5);
      const yLine = d3
        .scaleLinear()
        .domain([0, yMax])
        .nice()
        .range([lineHeight, 0]);

      const lineG = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      lineG
        .append("g")
        .call(d3.axisLeft(yLine).tickSize(-lineW).tickFormat(""))
        .selectAll("line")
        .attr("stroke", "#ccc");

      lineG
        .append("g")
        .call(d3.axisLeft(yLine).ticks(5).tickSize(0))
        .select(".domain")
        .remove();

      const lineGen = d3
        .line()
        .x((d) => xLine(d.condition))
        .y((d) => yLine(d.value))
        .curve(d3.curveMonotoneX);

      const hitPaths = lineG
        .selectAll(".hit-path")
        .data(transcripts)
        .join("path")
        .attr("class", "hit-path")
        .attr("d", (d) => lineGen(d.expression))
        .attr("fill", "none")
        .attr("stroke", "transparent")
        .attr("stroke-width", 10)
        .style("cursor", "pointer");

      const lines = lineG
        .selectAll(".line")
        .data(transcripts)
        .join("path")
        .attr("class", "line")
        .attr("d", (d) => lineGen(d.expression))
        .attr("fill", "none")
        .attr("stroke", "#888")
        .attr("stroke-width", 2.5)
        .attr("opacity", 0.6);

      const focusG = lineG.append("g").attr("class", "focus-group");

      hitPaths
        .on("mouseover", function (event, d) {
          lines
            .attr("stroke", "#888")
            .attr("stroke-width", 2.5)
            .attr("opacity", 0.6);
          focusG.selectAll("*").remove();
          const idx = transcripts.indexOf(d);
          d3.select(lines.nodes()[idx])
            .raise()
            .attr("stroke", "#000")
            .attr("stroke-width", 4)
            .attr("opacity", 1);
        })
        .on("mouseout", () => {
          lines
            .attr("stroke", "#888")
            .attr("stroke-width", 2.5)
            .attr("opacity", 0.6);
          focusG.selectAll("*").remove();
        });

      const allPoints = transcripts.flatMap((t) =>
        t.expression.map((e) => ({ transcript: t.transcript_id, ...e }))
      );

      lineG
        .selectAll(".pt-hit")
        .data(allPoints)
        .enter()
        .append("circle")
        .attr("class", "pt-hit")
        .attr("cx", (d) => xLine(d.condition))
        .attr("cy", (d) => yLine(d.value))
        .attr("r", 6)
        .attr("fill", "transparent")
        .style("cursor", "pointer")
        .on("mouseover touchstart", function (event, d) {
          // Añadir touchstart
          focusG.selectAll("*").remove();
          focusG
            .append("circle")
            .attr("cx", xLine(d.condition))
            .attr("cy", yLine(d.value))
            .attr("r", 6)
            .attr("fill", "#fff")
            .attr("stroke", "#000")
            .attr("stroke-width", 2);
          lines
            .attr("stroke", "#888")
            .attr("stroke-width", 2.5)
            .attr("opacity", 0.6);
          const idx = transcripts.findIndex(
            (t) => t.transcript_id === d.transcript
          );
          d3.select(lines.nodes()[idx])
            .raise()
            .attr("stroke", "#000")
            .attr("stroke-width", 4)
            .attr("opacity", 1);
          const containerRect = containerRef.current.getBoundingClientRect();
          const left = event.clientX - containerRect.left + 10;
          const top = event.clientY - containerRect.top - 10;
          tooltip
            .style("left", left + "px")
            .style("top", top + "px")
            .html(
              `ID: ${d.transcript}<br>Condición: ${d.condition}<br>Valor: ${d.value}`
            )
            .style("opacity", 1);
        })
        .on("mouseout touchend", function () {
          // Añadir touchend
          focusG.selectAll("*").remove();
          lines
            .attr("stroke", "#888")
            .attr("stroke-width", 2.5)
            .attr("opacity", 0.6);
          tooltip.style("opacity", 0);
        });

      // --- Barra de color ---
      const defs = svg.append("defs");
      const gradient = defs
        .append("linearGradient")
        .attr("id", "colorGradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

      gradient
        .selectAll("stop")
        .data(d3.range(0, 1.01, 0.25))
        .enter()
        .append("stop")
        .attr("offset", (d) => `${d * 100}%`)
        .attr("stop-color", (d) => d3.interpolateYlGnBu(d));

      const colorBarG = svg
        .append("g")
        .attr(
          "transform",
          `translate(${margin.left},${margin.top + lineHeight + 10})`
        );

      colorBarG
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", lineW)
        .attr("height", colorBarHeight)
        .attr("fill", "url(#colorGradient)");

      colorBarG
        .append("text")
        .attr("x", 0)
        .attr("y", colorBarHeight + 15)
        .attr("text-anchor", "start")
        .text("0")
        .style("font-size", "12px");

      colorBarG
        .append("text")
        .attr("x", lineW)
        .attr("y", colorBarHeight + 15)
        .attr("text-anchor", "end")
        .text(yMax.toFixed(2))
        .style("font-size", "12px");

      // --- Heatmap ---
      const hmG = svg
        .append("g")
        .attr(
          "transform",
          `translate(${margin.left},${margin.top + lineHeight + colorBarSpace})`
        );
      const xHeat = d3
        .scaleBand()
        .domain(conditions)
        .range([0, lineW])
        .padding(0.05);
      const yHeat = d3
        .scaleBand()
        .domain(transcripts.map((t) => t.transcript_id))
        .range([0, heatmapHeight])
        .padding(0.05);
      const colorScale = d3
        .scaleSequential(d3.interpolateYlGnBu)
        .domain([0, yMax]);

      const cells = hmG
        .selectAll("rect.cell")
        .data(
          transcripts.flatMap((t) =>
            t.expression.map((e) => ({ transcript: t.transcript_id, ...e }))
          )
        )
        .join("rect")
        .attr("class", "cell")
        .attr("x", (d) => xHeat(d.condition))
        .attr("y", (d) => yHeat(d.transcript))
        .attr("width", xHeat.bandwidth())
        .attr("height", yHeat.bandwidth())
        .attr("fill", (d) => colorScale(d.value))
        .style("cursor", "pointer");

      cells
        .on("mouseover touchstart", function (event, d) {
          // Añadir touchstart
          cells.attr("stroke", null);
          d3.select(this).attr("stroke", "#000").attr("stroke-width", 2);
          lines
            .attr("stroke", "#888")
            .attr("stroke-width", 2.5)
            .attr("opacity", 0.6);
          const idx = transcripts.findIndex(
            (t) => t.transcript_id === d.transcript
          );
          d3.select(lines.nodes()[idx])
            .raise()
            .attr("stroke", "#000")
            .attr("stroke-width", 4)
            .attr("opacity", 1);
          focusG.selectAll("*").remove();
          focusG
            .append("circle")
            .attr("cx", xLine(d.condition))
            .attr("cy", yLine(d.value))
            .attr("r", 6)
            .attr("fill", "#fff")
            .attr("stroke", "#000")
            .attr("stroke-width", 2);
          const containerRect = containerRef.current.getBoundingClientRect();
          const left = event.clientX - containerRect.left + 10;
          const top = event.clientY - containerRect.top - 10;
          tooltip
            .style("left", left + "px")
            .style("top", top + "px")
            .html(
              `ID: ${d.transcript}<br>Condición: ${d.condition}<br>Valor: ${d.value}`
            )
            .style("opacity", 1);
        })
        .on("mouseout touchend", function () {
          // Añadir touchend
          cells.attr("stroke", null);
          lines
            .attr("stroke", "#888")
            .attr("stroke-width", 2.5)
            .attr("opacity", 0.6);
          focusG.selectAll("*").remove();
          tooltip.style("opacity", 0);
        });

      hmG
        .append("g")
        .attr("transform", `translate(0,${heatmapHeight})`)
        .call(d3.axisBottom(xHeat).tickSize(0))
        .selectAll("text")
        .attr("transform", "rotate(90)")
        .attr("x", 8)
        .attr("y", -rowH / 2)
        .style("text-anchor", "start");

      hmG
        .append("g")
        .call(d3.axisLeft(yHeat).tickSize(0))
        .selectAll("text")
        .style("font-size", "12px")
        .style("white-space", "nowrap");
    }

    drawChart();
    return () => resizeObserver.disconnect();
  }, [exprData]);

  if (loading) return <CircularProgress />;
  if (errorMsg)
    return <Box sx={{ my: 2, color: "error.main" }}>Error: {errorMsg}</Box>;
  if (!exprData) return null;

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        width: "90%",
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: 1,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Expresión génica por transcript
      </Typography>
      <svg ref={svgRef} width="100%" height="auto" />
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          opacity: 0,
          background: "white",
          border: "1px solid black",
          padding: "5px",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
    </Box>
  );
}
