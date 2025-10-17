// standard

// third party
import { Box } from "@mui/material";

// local
import StructTable from "./struct-table";
//import StructTools from "./struct-tools";

export default function DataTable({ term }) {
  return (
    <Box
      sx={{
        my: { xs: 3, md: 3 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: { xs: "center", md: "flex-start" },
        gap: { xs: 2, md: 3 },
      }}
    >
      {/* Responsive layout and positioning for data table */}
      <Box
        sx={{
          width: { xs: "90%", md: "90%" },
          order: { xs: 1, md: 1 },
        }}
      >
        <StructTable term={term} />
      </Box>

      {/* Responsive layout and positioning for tools panel 
      <Box
        sx={{
          width: { xs: "90%", md: "20%" },
          order: { xs: 2, md: 2 },
          alignItems: { md: "center" },
          justifyContent: { md: "flex-start" },
        }}
      >
        <StructTools />
      </Box>*/}
    </Box>
  );
}
