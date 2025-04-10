"use client";

import { Box, Typography } from "@mui/material";
import { datasets } from "@/static/datasets/";

// URL base construida con las variables de entorno
const URI_JBROWSE = `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_JBROWSE_PORT}`;

export default function StructJBrowse({ geneData }) {
  // Verifica que geneData tenga la información necesaria
  const isDataIncomplete =
    !geneData ||
    !geneData.chromosomeName ||
    !geneData.geneStart ||
    !geneData.geneEnd ||
    !geneData.organismId;

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

  const foundDataset = datasets.find(
    (dataset) => dataset._id === geneData.organismId
  );

  if (!foundDataset) {
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
            No dataset found for organism id: {geneData.organismName}
          </Typography>
        </Box>
      </Box>
    );
  }

  const assemblyName = foundDataset.assamblyName;
  const tracksAssembly = foundDataset.tracks;
  const locParam = `${geneData.chromosomeName}:${geneData.geneStart}..${geneData.geneEnd}`;
  const queryParams = new URLSearchParams({
    config: "config.json",
    loc: locParam,
    assembly: assemblyName,
    tracks: tracksAssembly,
  }).toString();
  const url = `${URI_JBROWSE}/?${queryParams}`;

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
