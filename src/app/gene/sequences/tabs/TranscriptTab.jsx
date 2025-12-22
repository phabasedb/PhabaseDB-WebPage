// third party
import { Box, Typography } from "@mui/material";

// local
import { buildTranscriptAnnotations } from "../utils/buildAnnotations";
import { buildHighlightedSegments } from "../utils/sequenceHighlighter";
import SequenceRenderer from "../components/SequenceRenderer";

export default function TranscriptTab({ chromosome, selectedTranscript }) {
  if (!selectedTranscript) {
    return (
      <Box sx={{ p: 1 }}>
        <Typography variant="body1">
          No transcript available for this gene.
        </Typography>
      </Box>
    );
  }

  const segments = buildHighlightedSegments({
    sequence: selectedTranscript.sequence,
    start: selectedTranscript.start,
    strand: selectedTranscript.strand,
    annotations: buildTranscriptAnnotations(selectedTranscript),
  });

  return (
    <Box>
      <Box sx={{ p: 1 }}>
        <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
          {`>${selectedTranscript.accessionId} | ${chromosome?.name} : ${selectedTranscript.start}..${selectedTranscript.end} ${selectedTranscript.strand}`}
        </Typography>
      </Box>

      <Box sx={{ px: 1 }}>
        <SequenceRenderer segments={segments} />
      </Box>
    </Box>
  );
}
