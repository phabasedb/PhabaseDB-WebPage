// standard

// third party
import { Box } from "@mui/material";

// local
import StructJBrowser from "./StructJBrowse";

export default function InformationGene({ geneData }) {
  return (
    <Box
      sx={{
        my: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <StructJBrowser geneData={geneData} />
    </Box>
  );
}
