// third party
import { Box, Typography } from "@mui/material";

export default function PeptideTab({ selectedTranscript }) {
  if (!selectedTranscript) {
    return <Typography sx={{ p: 1 }}>No transcript selected.</Typography>;
  }

  const peptide = selectedTranscript.product?.aminoacidSequence;

  if (!peptide) {
    return (
      <Typography sx={{ p: 1 }}>
        No peptide available for this transcript.
      </Typography>
    );
  }

  return (
    <Box>
      <Box sx={{ p: 1 }}>
        <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
          {`>${selectedTranscript.accessionId} Peptide`}
        </Typography>
      </Box>

      <Box sx={{ px: 1 }}>
        <Typography
          variant="body1"
          sx={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}
        >
          {peptide}
        </Typography>
      </Box>
    </Box>
  );
}
