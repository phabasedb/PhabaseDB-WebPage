// standard

// third party
import { Box } from "@mui/material";

// local
import StructInformGene from "./StructInformGene";

export default function InformationGene({
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
      <StructInformGene
        geneData={geneData}
        selectedTranscript={selectedTranscript}
        setSelectedTranscript={setSelectedTranscript}
      />
    </Box>
  );
}
