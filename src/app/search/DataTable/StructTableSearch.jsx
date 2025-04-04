"use client";

// standard
import { useMemo } from "react";

// third party
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const CircularProgress = dynamic(() =>
  import("@mui/material/CircularProgress")
);
import { Box, Tooltip, Button, IconButton, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import MUIDataTable from "mui-datatables";

// local
import { useGetSearchResults } from "@/components/WebService/Search";

export default function StructTableSearch({ searchTerm }) {
  const { formattedData, loading, error } = useGetSearchResults(
    searchTerm || ""
  );
  const geneData = useMemo(() => formattedData || [], [formattedData]);

  const router = useRouter();

  if (loading)
    return (
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 2,
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
          An error occurred while loading the data for gene {searchTerm}. Please
          try again.
        </Typography>
      </Box>
    );

  if (!geneData || geneData.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 2,
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
          No data was found for the gene: {searchTerm}
        </Typography>
      </Box>
    );
  }

  const columns = [
    {
      name: "tools",
      label: "Tools",
      options: {
        filter: false,
        sort: false,
        //Configuration value and updateValue
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", sm: "column", xl: "row" },
                gap: 1,
                alignItems: "center",
              }}
            >
              <Tooltip title="Gene Information">
                <IconButton
                  color="primary"
                  onClick={
                    () => router.push(`/gene/${tableMeta.rowData[1]}`) // Rediriging gene/[idGene]
                  }
                >
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Gene Expression Visualization">
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                  onClick={() =>
                    alert(`Ver Gene Expression de ${tableMeta.rowData[1]}`)
                  }
                >
                  GE
                </Button>
              </Tooltip>
              <Tooltip title="JBrowser Visualization">
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  sx={{ mx: 1, fontWeight: "bold" }}
                  onClick={() =>
                    alert(`Visualizar en JBrowser: ${tableMeta.rowData[1]}`)
                  }
                >
                  B
                </Button>
              </Tooltip>
            </Box>
          );
        },
      },
    },
    { name: "geneIdOriginal", label: "Gene ID" },
    { name: "geneName", label: "Gene Name" },
    { name: "chromosomeName", label: "Chromosome Name" },
    { name: "organismName", label: "Organism Name" },
  ];

  const options = {
    filter: false,
    responsive: "simple",
    selectableRows: "none",
    viewColumns: false,
    print: false,
    rowsPerPageOptions: [5, 10, 15, 25, 50, 100],
    rowsPerPage: 5,

    onDownload: (buildHead, buildBody, columns, data) => {
      const filteredColumns = columns.filter((col) => col.label !== "Tools");
      const filteredData = data.map((row) => {
        const filteredRowData = row.data.filter(
          (_, index) => columns[index].label !== "Tools"
        );
        return { data: filteredRowData };
      });
      const csvContent = buildHead(filteredColumns) + buildBody(filteredData);
      return "\uFEFF" + csvContent;
    },
  };

  return <MUIDataTable data={geneData} columns={columns} options={options} />;
}
