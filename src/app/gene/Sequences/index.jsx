// standard

// third party
import { Box } from "@mui/material";

// local
import StructInfoSequencesGene from "./StructInfoSequencesGene";

export default function SequencesGene({ geneData, selectedTranscript }) {
  return (
    <Box
      sx={{
        my: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <StructInfoSequencesGene
        geneData={geneData}
        selectedTranscript={selectedTranscript}
      />
    </Box>
  );
}
