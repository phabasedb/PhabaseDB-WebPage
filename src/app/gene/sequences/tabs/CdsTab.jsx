// third party
import { Box, Typography } from "@mui/material";

// local
import SequenceRenderer from "../components/SequenceRenderer";
import { renderCdsSequence } from "../utils/renderCdsSequence";

export default function CdsTab({ selectedTranscript }) {
  if (!selectedTranscript) {
    return <Typography sx={{ p: 1 }}>No transcript selected.</Typography>;
  }

  const cdsList = selectedTranscript.cds || [];

  if (!cdsList.length) {
    return (
      <Typography sx={{ p: 1 }}>
        No CDS available for this transcript.
      </Typography>
    );
  }

  const segments = renderCdsSequence({
    cds: cdsList,
    strand: selectedTranscript.strand,
  });

  return (
    <Box>
      <Box sx={{ p: 1 }}>
        <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
          {`>${selectedTranscript.accessionId} CDS`}
        </Typography>
      </Box>

      <Box sx={{ px: 1 }}>
        <SequenceRenderer segments={segments} />
      </Box>
    </Box>
  );
}
