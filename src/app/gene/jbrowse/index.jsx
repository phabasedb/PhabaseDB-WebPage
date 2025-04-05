// standard

// third party
import { Box } from "@mui/material";

// local
import StructJBrowse from "./struct-jbrowse";

export default function JBrowse({ geneData }) {
  return (
    <Box
      sx={{
        my: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <StructJBrowse geneData={geneData} />
    </Box>
  );
}
