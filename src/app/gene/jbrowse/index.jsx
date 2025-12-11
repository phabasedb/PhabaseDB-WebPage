// standard

// third party
import { Box } from "@mui/material";

// local
import StructJBrowse from "./struct-jbrowse";

export default function JBrowse({ gene, organism, chromosome }) {
  return (
    <Box
      sx={{
        my: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <StructJBrowse gene={gene} organism={organism} chromosome={chromosome} />
    </Box>
  );
}
