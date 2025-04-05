// standard

// third party
import { Box } from "@mui/material";

// local
import StructTable from "./struct-table";
import StructTools from "./struct-tools";

export default function DataTable({ term }) {
  return (
    <Box
      sx={{
        my: 3,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 2, md: 3 },
        justifyContent: "center",
        alignItems: { xs: "center", md: "flex-start" },
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", md: "70%" },
          order: { xs: 1, md: 1 },
        }}
      >
        <StructTable term={term} />
      </Box>

      <Box
        sx={{
          width: { xs: "90%", md: "20%" },
          order: { xs: 2, md: 2 },
          justifyContent: { md: "flex-start" },
          alignItems: { md: "center" },
        }}
      >
        <StructTools />
      </Box>
    </Box>
  );
}
