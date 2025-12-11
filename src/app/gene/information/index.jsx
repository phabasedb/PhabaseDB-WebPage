// standard

// third party
import { Box } from "@mui/material";

// local
import StructInfo from "./struct-info";

export default function Information({
  gene,
  organism,
  chromosome,
  transcripts,
  selectedTranscript,
  setSelectedTranscript,
  onNavClick,
}) {
  return (
    <Box
      sx={{
        my: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <StructInfo
        gene={gene}
        organism={organism}
        chromosome={chromosome}
        transcripts={transcripts}
        selectedTranscript={selectedTranscript}
        setSelectedTranscript={setSelectedTranscript}
        onNavClick={onNavClick}
      />
    </Box>
  );
}
