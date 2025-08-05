//standard
import { useState, useEffect } from "react";

//third party
import { Box, Typography, Chip, CircularProgress } from "@mui/material";
import MUIDataTable from "mui-datatables";

//local
import { useMetaData } from "@/components/ApiService/Expression";

//Name of the columns defined for the table
const columnsDef = [
  { name: "library", label: "Library" },
  { name: "organism", label: "Organism" },
  { name: "cultivar", label: "Cultivar" },
  { name: "genotype", label: "Genotype" },
  { name: "tissue_organ", label: "Tissue/Organ" },
  { name: "treatment", label: "Treatment" },
  { name: "inocula", label: "Inocula" },
  { name: "time_post_treatment", label: "Time post‑treatment/inoculation" },
  { name: "additional_info", label: "Additional information" },
  { name: "reference", label: "Reference" },
  {
    name: "doi",
    label: "DOI",
    options: {
      customBodyRender: (value) => {
        if (value === "-") return "-";
        return (
          <a href={value} target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        );
      },
    },
  },
];

export function MetadataSection({ selected, onSelectCols }) {
  const { data, error, loading } = useMetaData(selected?.metadata?.path || "");
  const [selectedCols, setSelectedCols] = useState([]);

  // Propagate selection order up
  useEffect(() => {
    onSelectCols(selectedCols);
  }, [selectedCols, onSelectCols]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center" }}>
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

  const options = {
    filter: true,
    pagination: true,
    print: false,
    viewColumns: false,
    responsive: "standard",
    rowsPerPageOptions: [5, 10, 15],
    rowsPerPage: 5,
    selectableRows: "multiple",
    selectableRowsOnClick: true,
    selectableRowsHeader: true,
    customToolbarSelect: () => null,
    onRowSelectionChange: (_, __, rowsSelected) => {
      // rowsSelected preserves click order
      const cols = rowsSelected.map((i) => data[i].library);
      setSelectedCols(cols);
    },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <MUIDataTable
        title={`Metadata for ${selected.database}`}
        data={data}
        columns={columnsDef}
        options={options}
      />

      {selectedCols.length > 0 && (
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Selected columns:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {selectedCols.map((col, index) => (
              <Chip key={index} label={col} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
