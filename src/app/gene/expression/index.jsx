// standard

// third party
import { Box } from "@mui/material";

// local
import StructExpression from "./struct-expression";

export default function Expression({ geneData }) {
  return (
    <Box
      sx={{
        my: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <StructExpression geneData={geneData} />
    </Box>
  );
}
