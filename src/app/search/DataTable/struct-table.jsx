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
import { datasets } from "@/static/datasets/";

const URI_JBROWSE = `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_JBROWSE_PORT}`;

const buildJBrowseUrlForGene = (gene) => {
  if (
    !gene.chromosomeName ||
    !gene.geneStart ||
    !gene.geneEnd ||
    !gene.organismId
  ) {
    return null;
  }

  const foundDataset = datasets.find(
    (dataset) => dataset._id === gene.organismId
  );
  if (!foundDataset) {
    return null;
  }

  const assemblyName = foundDataset.assamblyName;
  const tracksAssembly = foundDataset.tracks;
  const locParam = `${gene.chromosomeName}:${gene.geneStart}..${gene.geneEnd}`;
  const queryParams = new URLSearchParams({
    config: "config.json",
    loc: locParam,
    assembly: assemblyName,
    tracks: tracksAssembly,
  }).toString();

  const url = `${URI_JBROWSE}/?${queryParams}`;
  return url;
};

export default function StructTable({ term }) {
  const { formattedData, loading, error } = useGetSearchResults(term || "");
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
          {error}
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
          No data was found for the gene: {term}
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
                  sx={{ fontWeight: "bold" }}
                  onClick={() => {
                    // Se obtiene el registro gene usando tableMeta.rowIndex
                    const geneRecord = geneData[tableMeta.rowIndex];
                    const url = buildJBrowseUrlForGene(geneRecord);
                    if (url) {
                      router.push(url);
                    } else {
                      alert("Insufficient data to build JBrowse URL.");
                    }
                  }}
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
