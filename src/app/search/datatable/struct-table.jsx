"use client";

// standard
import { useMemo } from "react";
import { useRouter } from "next/navigation";

// third party
import { Box, Tooltip, Button, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import MUIDataTable from "mui-datatables";

// local
import { useGeneSearch, useAllGenes } from "@/components/WebService/Search";
//import { buildJBrowseUrl } from "@/shared/builduri-jbrowse";
import DataHandler from "./utils/data-handler";

export default function StructTable({ term }) {
  // Definition of functions linked to predefined search terms
  const hookGeneralTerms = { GENES: useAllGenes };

  // Selects the appropriate hook based on the search term
  const hookToUse = hookGeneralTerms[term] || (() => useGeneSearch(term));

  const { data, loading, error } = hookToUse();
  const router = useRouter();

  //Column definitions for the MUI-Datatables table
  const columns = useMemo(
    () => [
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
                  alignItems: "center",
                  gap: 1,
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
    ],
    []
  );

  //Configuration options definition for the MUI-Datatables table
  const options = useMemo(
    () => ({
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
    }),
    []
  );

  return (
    <DataHandler loading={loading} error={error} data={data} term={term}>
      <MUIDataTable data={data} columns={columns} options={options} />
    </DataHandler>
  );
}
