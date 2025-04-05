// standard

// third party
import { Box } from "@mui/material";

// local
import StructInfo from "./struct-info";

export default function Information({
  geneData,
  selectedTranscript,
  setSelectedTranscript,
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
        geneData={geneData}
        selectedTranscript={selectedTranscript}
        setSelectedTranscript={setSelectedTranscript}
      />
    </Box>
  );
}
