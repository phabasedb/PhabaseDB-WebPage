// standard
import React, { useMemo } from "react";

// third party
import { Box, Typography } from "@mui/material";

// local
import {
  renderSequenceGenTrans,
  renderSequenceCDS,
} from "./sequence-highlighter";

// Gene and Transcript selected
export function DisplayGenTrans({
  sequence,
  seqlength,
  start,
  strand,
  annotations,
}) {
  // Compute the highlighted sequence using a helper function
  const highlightedSequence = useMemo(() => {
    return renderSequenceGenTrans(
      sequence,
      seqlength,
      start,
      strand,
      annotations
    );
  }, [sequence, seqlength, start, strand, annotations]);

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
export function DisplayCDS({
  sequence,
  seqlength,
  start,
  strand,
  annotations,
}) {
  // Compute the highlighted CDS sequence using a helper function
  const highlightedSequence = useMemo(() => {
    return renderSequenceCDS(sequence, seqlength, start, strand, annotations);
  }, [sequence, seqlength, start, strand, annotations]);

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
