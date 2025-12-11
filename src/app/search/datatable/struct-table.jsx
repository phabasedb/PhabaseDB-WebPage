"use client";

// standard
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// third party
import { Box, Tooltip, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import MUIDataTable from "mui-datatables";

// local
import { useAllGenes, useGeneByTerm } from "@/components/WebService/gene";
import DataHandler from "./utils/data-handler";

export default function StructTable({ term }) {
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const GENERAL_TERMS = {
    GENES: (vars) => useAllGenes(vars),
    //more..
  };

  const isGeneral = !!GENERAL_TERMS[term];

  const hookToUse = isGeneral
    ? GENERAL_TERMS[term]
    : (vars) => useGeneByTerm(term, vars);

  const { data, loading, error, pagination } = hookToUse({
    limit,
    page,
  });

  const columns = useMemo(
    () => [
      {
        name: "tools",
        label: "Tools",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (_, tableMeta) => {
            const geneId = tableMeta.rowData[1];

            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Tooltip title="Gene Information">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      router.push(`/gene/${encodeURIComponent(geneId)}`)
                    }
                  >
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            );
          },
        },
      },
      { name: "genAccessionId", label: "Gene ID" },
      { name: "genName", label: "Gene Name" },
      { name: "chromosomeName", label: "Chromosome Name" },
      { name: "organismName", label: "Organism Name" },
    ],
    [router]
  );

  const options = useMemo(
    () => ({
      filter: false,
      viewColumns: true,
      print: false,
      download: false,
      search: false,
      responsive: "simple",
      selectableRows: "none",

      page: pagination?.currentPage ?? 0,
      rowsPerPage: pagination?.limit ?? limit,
      count: pagination?.totalResults ?? 0,

      rowsPerPageOptions: [10, 25, 50, 100],

      onTableChange: (action, tableState) => {
        if (action === "changePage") {
          setPage(tableState.page);
        }
        if (action === "changeRowsPerPage") {
          setLimit(tableState.rowsPerPage);
          setPage(0);
        }
      },
    }),
    [pagination, limit]
  );

  return (
    <DataHandler loading={loading} error={error}>
      <MUIDataTable data={data} columns={columns} options={options} />
    </DataHandler>
  );
}
