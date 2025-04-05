// standard

// third party
import { Box } from "@mui/material";

// local
import StructSequences from "./struct-sequences";

export default function Sequences({ geneData, selectedTranscript }) {
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
        geneData={geneData}
        selectedTranscript={selectedTranscript}
      />
    </Box>
  );
}
