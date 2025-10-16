//standard
import { useMemo, useEffect, useRef } from "react";

//third party
import { Box, CircularProgress, Button, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import MUIDataTable from "mui-datatables";

//local
import { useGenesIdsMatrix } from "@/components/ApiService/Expression";
import { flattenExpressionData } from "@/shared/expression/utils/flatten-expression";
import { pivotableExpressionDataMui } from "@/shared/expression/utils/pivotablemui-expression";
import GeneExpressionChart from "@/components/ExpressionChart";
import { downloadSVG } from "@/shared/expression/utils/download-svg";

export function MatrixSection({
  ids,
  columns,
  matrixPath,
  graphType,
  chartWidth,
  measure,
}) {
  // chart reference status
  const svgRef = useRef(null);

  const {
    data: raw,
    notFound,
    loading,
    error,
  } = useGenesIdsMatrix(ids, columns, matrixPath);

  const { data: flatData, error: flattenError } = useMemo(
    () => flattenExpressionData(raw),
    [raw]
  );

  const {
    columns: colsMui,
    data: rowsMui,
    error: pivotError,
  } = useMemo(() => pivotableExpressionDataMui(flatData), [flatData]);

  useEffect(() => {
    if (flatData && flatData.length) measure();
  }, [flatData, measure]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", my: 1 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: 5,
        }}
      >
        <Typography
          variant="body2"
          color="error"
          sx={{
            p: 2,
            lineHeight: 1.5,
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {error}
        </Typography>
      </Box>
    );
  }
  if (flattenError) {
    return (
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: 5,
        }}
      >
        <Typography
          variant="body2"
          color="error"
          sx={{
            p: 2,
            lineHeight: 1.5,
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {flattenError}
        </Typography>
      </Box>
    );
  }
  if (pivotError) {
    return (
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: 5,
        }}
      >
        <Typography
          variant="body2"
          color="error"
          sx={{
            p: 2,
            lineHeight: 1.5,
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {pivotError}
        </Typography>
      </Box>
    );
  }

  const handleDownload = () => {
    downloadSVG(svgRef.current, "chart.svg");
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
            px: 2,
            py: 1,
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
          <Box sx={{ textAlign: "right" }}>
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
      {flatData && flatData.length > 0 && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{ width: chartWidth, overflowX: "auto", overflowY: "hidden" }}
          >
            <GeneExpressionChart
              data={flatData}
              graphType={graphType}
              columnWidth={20}
              svgRef={svgRef}
            />
          </Box>
        </Box>
      )}
      {rowsMui && rowsMui.length > 0 && (
        <Box sx={{ width: chartWidth }}>
          <MUIDataTable
            title="Gene Expression Table"
            data={rowsMui}
            columns={colsMui}
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
      )}
      {notFound && notFound.ids.length > 0 && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            color="error"
            sx={{
              p: 2,
              lineHeight: 1.5,
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            IDs not found: {notFound.ids.join(", ")}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
