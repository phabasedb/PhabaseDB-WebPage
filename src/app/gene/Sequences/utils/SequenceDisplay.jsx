// standard
import React, { useMemo } from "react";

// third party
import { Box, Typography } from "@mui/material";

// local
import { renderSequenceGT, renderSequenceCDS } from "./SequenceHighlighter";

// Gene and Transcript selected
export function SequenceDisplayGT({ sequence, start, annotations }) {
  // Compute the highlighted sequence using a helper function
  const highlightedSequence = useMemo(() => {
    return renderSequenceGT(sequence, start, annotations);
  }, [sequence, start, annotations]);

  return (
    <Box sx={{ px: 1 }}>
      <Typography
        variant="body1"
        sx={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
        }}
      >
        {highlightedSequence}
      </Typography>
    </Box>
  );
}

// CDS of the transcript selected
export function SequenceDisplayCDS({ sequence, start, annotations }) {
  // Compute the highlighted CDS sequence using a helper function
  const highlightedSequence = useMemo(() => {
    return renderSequenceCDS(sequence, start, annotations);
  }, [sequence, start, annotations]);

  return (
    <Box sx={{ px: 1 }}>
      <Typography
        variant="body1"
        sx={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
        }}
      >
        {highlightedSequence}
      </Typography>
    </Box>
  );
}
