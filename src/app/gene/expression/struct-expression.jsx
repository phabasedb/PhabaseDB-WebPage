"use client";

//standard
import { useEffect, useRef, useMemo } from "react";

//third party
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import MUIDataTable from "mui-datatables";

//local
import { datasets } from "@/static/expression/datasets";
import { useGeneMatrix } from "@/components/ApiService/Expression";
import { flattenExpressionData } from "@/shared/expression/utils/flatten-expression";
import { pivotableExpressionDataMui } from "@/shared/expression/utils/pivotablemui-expression";
import GeneExpressionChart from "@/components/ExpressionChart";
import useBreakpointWidthExpChart from "@/shared/expression/utils/breakpoints-widthChart";
import useContainerWidth from "@/shared/expression/utils/container-width";
import ErrorBoxPageGene from "../shared/utils/error-box";
import { downloadSVG } from "@/shared/expression/utils/download-svg";

export default function StructExpression({ geneData }) {
  const svgRef = useRef(null);

  const ds = datasets.find((d) => d.id === geneData?.organism?.id);
  if (!ds) {
    return (
      <ErrorBoxPageGene text="The gene expression viewer could not be loaded. No genomic data is currently available for the selected organism. Please try again later or contact an administrator." />
    );
  }

  const {
    ref: containerRef,
    width: containerWidth,
    measure,
  } = useContainerWidth();
  const fallbackWidth = useBreakpointWidthExpChart();

  const { data, loading, error } = useGeneMatrix(
    geneData?.accession,
    ds?.matrix?.path || ""
  );

  const { data: flatData, error: flattenError } = useMemo(
    () => flattenExpressionData(data),
    [data]
  );

  const {
    columns: columns_mui,
    data: rows_mui,
    error: pivotableError,
  } = useMemo(
    () => pivotableExpressionDataMui(flatData, { includeGeneId: false }),
    [flatData]
  );

  // Hook para forzar medición tras cargar flatData
  useEffect(() => {
    if (flatData && flatData.length > 0) {
      measure();
    }
  }, [flatData, measure]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", my: 1 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return <ErrorBoxPageGene text={error} />;
  }
  if (flattenError) {
    return <ErrorBoxPageGene text={flattenError} />;
  }
  if (pivotableError) {
    return <ErrorBoxPageGene text={pivotableError} />;
  }

  const chartWidth = containerWidth > 0 ? containerWidth : fallbackWidth;

  const handleDownload = () => {
    const name = geneData?.accession || "chart";
    downloadSVG(svgRef.current, `${name}.svg`);
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "90%",
        maxWidth: "100%",
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 5,
        pt: 2,
        pb: 1,
        gap: 1,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            alignItems: "center",
            gap: { xs: 1, md: 0 },
          }}
        >
          <Box sx={{ textAlign: "left" }}>
            <Typography
              variant="h4"
              sx={{
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.4rem",
                  md: "1.8rem",
                  lg: "2.0rem",
                  xl: "2.4rem",
                },
                fontWeight: 500,
              }}
            >
              Gene Expression
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: "right",
              mt: { xs: 2, md: 0 },
            }}
          >
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
            >
              Download
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Chart container */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: chartWidth,
            overflowX: "auto",
            overflowY: "hidden",
          }}
        >
          <GeneExpressionChart
            data={flatData}
            columnWidth={100}
            svgRef={svgRef}
          />
        </Box>
      </Box>

      {/* Data Table */}
      <Box
        sx={{
          width: chartWidth,
        }}
      >
        <MUIDataTable
          title={`Gene Expression Table for ${geneData?.accession}`}
          data={rows_mui}
          columns={columns_mui}
          options={{
            responsive: "standard",
            tableBodyWidth: "100%",
            selectableRows: "none",
            filter: true,
            viewColumns: true,
            pagination: false,
            print: false,
            fixedHeader: false,
          }}
        />
      </Box>
    </Box>
  );
}
