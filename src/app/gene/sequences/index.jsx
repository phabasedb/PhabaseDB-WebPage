// standard

// third party
import { Box } from "@mui/material";

// local
import StructSequences from "./struct-sequences";

export default function Sequences({ gene, chromosome, selectedTranscript }) {
  return (
    <Box
      sx={{
        my: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <StructSequences
        gene={gene}
        chromosome={chromosome}
        selectedTranscript={selectedTranscript}
      />
    </Box>
  );
}
