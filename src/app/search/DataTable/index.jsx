// standard

// third party
import { Box } from "@mui/material";

// local
import StructTableSearch from "./StructTableSearch";
import StructOptionSearch from "./StructOptionSearch";

export default function DataTable({ searchTerm }) {
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
        <StructTableSearch searchTerm={searchTerm} />
      </Box>

      <Box
        sx={{
          width: { xs: "90%", md: "20%" },
          order: { xs: 2, md: 2 },
          justifyContent: { md: "flex-start" },
          alignItems: { md: "center" },
        }}
      >
        <StructOptionSearch />
      </Box>
    </Box>
  );
}
