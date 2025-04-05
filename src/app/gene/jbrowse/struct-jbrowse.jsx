// standard

// third party
import { Box, Typography } from "@mui/material";

// local

export default function StructJBrowse({ geneData }) {
  // Check if geneData is missing or lacks required fields
  const isDataIncomplete =
    !geneData ||
    !geneData.chromosomeName ||
    !geneData.geneStart ||
    !geneData.geneEnd;

  if (isDataIncomplete) {
    return (
      <Box
        sx={{
          my: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            background: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
            borderRadius: 2,
          }}
        >
          <Typography sx={{ p: 2 }}>
            JBrowser visualization not available, incomplete data for gene:{" "}
            {geneData?.geneIdOriginal ?? geneData?.geneId ?? "Unknown"}
          </Typography>
        </Box>
      </Box>
    );
  }
  // Construct the URL with encoded values for safety
  const url = `http://192.168.0.14:5000/?config=phabase%2Fjamapa%2Fconfig.json&assembly=LjG1.1&loc=${encodeURIComponent(
    `${geneData.chromosomeName}:${geneData.geneStart}..${geneData.geneEnd}`
  )}&tracks=sequence`;

  return (
    <Box
      sx={{
        width: "90%",
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <iframe
        src={url}
        title="JBrowser"
        width="100%"
        height="700px"
        style={{ border: "none" }}
        tabIndex="-1"
      />
    </Box>
  );
}
