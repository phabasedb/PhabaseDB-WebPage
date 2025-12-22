// third party
import { Box, Typography } from "@mui/material";

// local
import { buildTranscriptAnnotations } from "../utils/buildAnnotations";
import { buildHighlightedSegments } from "../utils/sequenceHighlighter";
import SequenceRenderer from "../components/SequenceRenderer";

export default function GenomicTab({ gene, chromosome, selectedTranscript }) {
  if (!gene?.sequence) {
    return (
      <Box sx={{ p: 1 }}>
        <Typography>No genomic sequence available.</Typography>
      </Box>
    );
  }

  const annotations = buildTranscriptAnnotations(selectedTranscript);

  const segments = buildHighlightedSegments({
    sequence: gene.sequence,
    start: gene.start,
    strand: gene.strand,
    annotations,
  });

  return (
    <Box>
      <Box sx={{ p: 1 }}>
        <Typography>
          {`>${gene.accessionId} | ${chromosome.name}: ${gene.start}..${gene.end} ${gene.strand}`}
        </Typography>
      </Box>

      <Box sx={{ px: 1 }}>
        <SequenceRenderer segments={segments} />
      </Box>
    </Box>
  );
}
