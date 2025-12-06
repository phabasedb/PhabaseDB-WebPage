// standard

// third party
import { Box } from "@mui/material";

// local
import StructTable from "./struct-table";

export default function DataTable({ term }) {
  return (
    <Box
      sx={{
        my: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
        }}
      >
        <StructTable term={term} />
      </Box>
    </Box>
  );
}
