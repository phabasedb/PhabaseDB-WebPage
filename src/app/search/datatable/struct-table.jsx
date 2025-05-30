"use client";

// standard
import { useMemo } from "react";

// third party
import { useRouter } from "next/navigation";
import { Box, Tooltip, Button, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import MUIDataTable from "mui-datatables";

// local
import { useGeneSearch, useAllGenes } from "@/components/WebService/Search";
//import { buildJBrowseUrl } from "@/shared/builduri-jbrowse";
import DataHandler from "./utils/data-handler";

export default function StructTable({ term }) {
  const { data, loading, error } =
    term === "GENES" ? useAllGenes() : useGeneSearch(term);
  const GENE_DATA = useMemo(() => data || [], [data]);
  const router = useRouter();

  const columns = [
    {
      name: "tools",
      label: "Tools",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const geneId = tableMeta.rowData[1]; // “accession” column

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
                    () => router.push(`/gene/${geneId}`) // Rediriging gene/[idGene]
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
                  onClick={
                    () => router.push(`/expression`) // Rediriging gene/[idGene]
                  }
                  //onClick={() => alert(`Ver Gene Expression de ${geneId}`)}
                >
                  GE
                </Button>
              </Tooltip>
            </Box>
          );
        },
      },
    },
    { name: "accession", label: "Gene ID" },
    { name: "name", label: "Gene Name" },
    { name: "chromosome", label: "Chromosome Name" },
    { name: "organism", label: "Organism Name" },
  ];

  const options = {
    filter: true,
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

  return (
    <DataHandler loading={loading} error={error} data={GENE_DATA} term={term}>
      <MUIDataTable data={GENE_DATA} columns={columns} options={options} />
    </DataHandler>
  );
}
