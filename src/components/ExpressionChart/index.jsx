//standard
import { useEffect, useRef } from "react";

//third party
import { Box } from "@mui/material";
import * as d3 from "d3";

//local

export default function GeneExpressionChart({
  data,
  columnWidth = 100,
  svgRef,
}) {
  // Reference variables in the container (graphic) and in the tooltips
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);

  // Function to display information (tooltips) at a specific position on the chart.
  function getEventCoords(event) {
    if (event.touches && event.touches.length > 0) {
      return {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    } else {
      return {
        x: event.clientX,
        y: event.clientY,
      };
    }
  }

  // Extract unique conditions from the data
  const conditions =
    Array.isArray(data) && data.length
      ? Array.from(new Set(data.map((d) => d.condition)))
      : [];
  // Group transcripts by ID and associate their expression data
  const transcriptsData =
    Array.isArray(data) && data.length
      ? Array.from(
          d3.group(data, (d) => d.transcriptId),
          ([id, records]) => ({ transcriptId: id, expression: records })
        )
      : [];

  // Start of the necessary precomputations for the chart
  // Calculate the maximum length of transcript IDs
  const maxLenId = transcriptsData.length
    ? Math.max(...transcriptsData.map((t) => t.transcriptId.length))
    : 0;

  // Computes left margin using the longest ID: 8 px per character + 10 px additional margin
  const marginLeft = maxLenId * 8 + 10;

  // Calculate the maximum length among condition names
  const maxConditionLen = conditions.length
    ? Math.max(...conditions.map((c) => c.length))
    : 0;

  // Estimated bottom margin: max condition length * 8 px + 10 extra px
  const marginBottom = maxConditionLen * 8 + 10;

  // Total chart drawing width (column width × number of conditions)
  const chartWidth = columnWidth * conditions.length;

  // Height of the line chart
  const lineHeight = 300;

  // Height of the gradient color bar
  const colorBarHeight = 30;

  // Height per row in the heatmap
  const heatmapRowHeight = 30;

  // Total heatmap height (number of transcripts × row height)
  const heatmapHeight = transcriptsData.length * heatmapRowHeight;

  // Space between line chart and color bar
  const spacingTopColorBar = 90;

  // Space between color bar and heatmap
  const spacingBottomColorBar = 50;

  // Definition of margins (using precomputed marginBottom and marginLeft)
  const margin = { top: 30, right: 30, bottom: marginBottom, left: marginLeft };

  // Total SVG width (margins + chart area)
  const width = margin.left + chartWidth + margin.right;

  // Total SVG height (lines, bars, spacings, heatmap, margins)
  const height =
    margin.top +
    lineHeight +
    spacingTopColorBar +
    colorBarHeight +
    spacingBottomColorBar +
    heatmapHeight +
    margin.bottom;

  useEffect(() => {
    // Validation: if `data` is empty or undefined, exit
    if (!data || data.length === 0) return;

    // Get the maximum value from the data
    const maxVal = d3.max(data, (d) => d.value) || 0;

    // Fully create and configure the SVG canvas for the chart
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMinYMin meet");
    // Clear any previous content inside the SVG
    svg.selectAll("*").remove();

    // Create the tooltip on the assigned container
    const tooltip = d3.select(tooltipRef.current);

    // Create the line chart
    const xLine = d3
      .scalePoint()
      .domain(conditions)
      .range([0, chartWidth])
      .padding(0.5);
    const yLine = d3
      .scaleLinear()
      .domain([0, maxVal])
      .nice()
      .range([lineHeight, 0]);

    const lineG = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    lineG
      .append("g")
      .call(d3.axisLeft(yLine).tickSize(-chartWidth).tickFormat(""))
      .selectAll("line")
      .attr("stroke", "#ccc");
    lineG
      .append("g")
      .call(d3.axisLeft(yLine).ticks(5).tickSize(0))
      .call((g) => g.selectAll("text").style("font-size", "12px"))
      .select(".domain")
      .remove();

    const lineGen = d3
      .line()
      .x((d) => xLine(d.condition))
      .y((d) => yLine(d.value))
      .curve(d3.curveMonotoneX);

    lineG
      .selectAll(".hit-path")
      .data(transcriptsData)
      .join("path")
      .attr("class", "hit-path")
      .attr("d", (d) => lineGen(d.expression))
      .attr("fill", "none")
      .attr("stroke", "transparent")
      .attr("stroke-width", 10)
      .style("cursor", "pointer");

    const lines = lineG
      .selectAll(".line")
      .data(transcriptsData)
      .join("path")
      .attr("class", "line")
      .attr("d", (d) => lineGen(d.expression))
      .attr("fill", "none")
      .attr("stroke", "#888")
      .attr("stroke-width", 4)
      .attr("opacity", 0.6);

    const focusG = lineG.append("g").attr("class", "focus-group");

    lineG
      .selectAll(".hit-path")
      .on("mouseover", (event, d) => {
        lines
          .attr("stroke", "#888")
          .attr("stroke-width", 4)
          .attr("opacity", 0.6);
        focusG.selectAll("*").remove();
        d3.select(lines.nodes()[transcriptsData.indexOf(d)])
          .raise()
          .attr("stroke", "#000")
          .attr("stroke-width", 4)
          .attr("opacity", 1);
      })
      .on("mouseout", () => {
        lines
          .attr("stroke", "#888")
          .attr("stroke-width", 4)
          .attr("opacity", 0.6);
        focusG.selectAll("*").remove();
      });

    // Retrieve all data points information for the tooltips
    const allPoints = transcriptsData.flatMap((t) =>
      t.expression.map((e) => ({ transcript: t.transcriptId, ...e }))
    );

    lineG
      .selectAll(".pt-hit")
      .data(allPoints)
      .join("circle")
      .attr("class", "pt-hit")
      .attr("cx", (d) => xLine(d.condition))
      .attr("cy", (d) => yLine(d.value))
      .attr("r", 6)
      .attr("fill", "transparent")
      .style("cursor", "pointer")
      .on("mouseover touchstart", (event, d) => {
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
          .attr("stroke-width", 4)
          .attr("opacity", 0.6);

        const idx = transcriptsData.findIndex(
          (t) => t.transcriptId === d.transcript
        );
        d3.select(lines.nodes()[idx])
          .raise()
          .attr("stroke", "#000")
          .attr("stroke-width", 4)
          .attr("opacity", 1);

        const { x, y } = getEventCoords(event);
        const rect = containerRef.current.getBoundingClientRect();
        tooltip
          .style("left", `${x - rect.left + 10}px`)
          .style("top", `${y - rect.top - 10}px`)
          .html(
            `<b>ID:</b> ${d.transcript}<br><b>Condición</b>: ${d.condition}<br><b>Valor:</b> ${d.value}`
          )
          .style("opacity", 1);
      })
      .on("mouseout touchend", () => {
        focusG.selectAll("*").remove();
        lines
          .attr("stroke", "#888")
          .attr("stroke-width", 4)
          .attr("opacity", 0.6);
        tooltip.style("opacity", 0);
      });

    // Construction of the color gradient bar
    const defs = svg.append("defs");
    const grad = defs.append("linearGradient").attr("id", "colorGradient");
    grad.attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
    grad
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
        `translate(${margin.left},${
          margin.top + lineHeight + spacingTopColorBar
        })`
      );

    // Title
    colorBarG
      .append("text")
      .attr("x", 0)
      .attr("y", -spacingTopColorBar / 2 + 10)
      .attr("text-anchor", "start")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text("Relative expression");

    // Add "Low" and "High" labels above the gradient bar
    colorBarG
      .append("text")
      .attr("x", 0)
      .attr("y", -5)
      .attr("text-anchor", "start")
      .style("font-size", "12px")
      .text("Low");

    colorBarG
      .append("text")
      .attr("x", chartWidth)
      .attr("y", -5)
      .attr("text-anchor", "end")
      .style("font-size", "12px")
      .text("High");

    // Definition of the gradient bar
    colorBarG
      .append("rect")
      .attr("width", chartWidth)
      .attr("height", colorBarHeight)
      .attr("fill", "url(#colorGradient)");

    // Display numeric values below the bar
    colorBarG
      .append("text")
      .attr("x", 0)
      .attr("y", colorBarHeight + 15)
      .attr("text-anchor", "start")
      .style("font-size", "12px")
      .text("0");

    colorBarG
      .append("text")
      .attr("x", chartWidth)
      .attr("y", colorBarHeight + 15)
      .attr("text-anchor", "end")
      .style("font-size", "12px")
      .text(maxVal.toFixed(2));

    // Create the SVG container for the Heatmap (<g> group)
    const heatG = svg
      .append("g")
      .attr(
        "transform",
        `translate(${margin.left},${
          margin.top +
          lineHeight +
          spacingTopColorBar +
          colorBarHeight +
          spacingBottomColorBar
        })`
      );

    const xHeat = d3
      .scaleBand()
      .domain(conditions)
      .range([0, chartWidth])
      .padding(0.05);
    const yHeat = d3
      .scaleBand()
      .domain(transcriptsData.map((t) => t.transcriptId))
      .range([0, heatmapHeight])
      .padding(0.05);
    const colorScaleHM = d3
      .scaleSequential(d3.interpolateYlGnBu)
      .domain([0, maxVal]);

    heatG
      .selectAll("rect.cell")
      .data(
        transcriptsData.flatMap((t) =>
          t.expression.map((e) => ({ transcript: t.transcriptId, ...e }))
        )
      )
      .join("rect")
      .attr("class", "cell")
      .attr("x", (d) => xHeat(d.condition))
      .attr("y", (d) => yHeat(d.transcript))
      .attr("width", xHeat.bandwidth())
      .attr("height", yHeat.bandwidth())
      .attr("fill", (d) => colorScaleHM(d.value))
      .style("cursor", "pointer")
      .on("mouseover touchstart", (event, d) => {
        heatG.selectAll("rect.cell").attr("stroke", null);
        d3.select(event.currentTarget)
          .attr("stroke", "#000")
          .attr("stroke-width", 2);

        lines
          .attr("stroke", "#888")
          .attr("stroke-width", 4)
          .attr("opacity", 0.6);
        const idx = transcriptsData.findIndex(
          (t) => t.transcriptId === d.transcript
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

        const { x, y } = getEventCoords(event);
        const rect = containerRef.current.getBoundingClientRect();
        tooltip
          .style("left", `${x - rect.left + 10}px`)
          .style("top", `${y - rect.top - 10}px`)
          .html(
            `<b>ID</b>: ${d.transcript}<br><b>Condición</b>: ${d.condition}<br><b>Valor:</b> ${d.value}`
          )
          .style("opacity", 1);
      })
      .on("mouseout touchend", () => {
        heatG.selectAll("rect.cell").attr("stroke", null);
        lines
          .attr("stroke", "#888")
          .attr("stroke-width", 4)
          .attr("opacity", 0.6);
        focusG.selectAll("*").remove();
        tooltip.style("opacity", 0);
      });

    // Rendering the labels: conditions (X-axis) and transcripts (Y-axis)
    heatG
      .append("g")
      .attr("transform", `translate(0,${heatmapHeight})`)
      .call(d3.axisBottom(xHeat).tickSize(0))
      .selectAll("text")
      .attr("transform", "rotate(90)")
      .attr("x", 8)
      .attr("y", -heatmapRowHeight / 2)
      .style("text-anchor", "start")
      .style("font-size", "12px");

    heatG
      .append("g")
      .call(d3.axisLeft(yHeat).tickSize(0))
      .selectAll("text")
      .style("font-size", "12px");
  }, [data, columnWidth, svgRef]);

  return (
    <Box ref={containerRef} sx={{ position: "relative" }}>
      <svg ref={svgRef} />
      <Box
        ref={tooltipRef}
        sx={{
          position: "absolute",
          pointerEvents: "none",
          background: "white",
          border: 1,
          p: 1,
          opacity: 0,
          zIndex: 10,
        }}
      />
    </Box>
  );
}
