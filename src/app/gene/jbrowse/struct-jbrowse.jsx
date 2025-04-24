"use client";

import { Box, Typography } from "@mui/material";
import { buildJBrowseUrl } from "@/shared/builduri-jbrowse";

export default function StructJBrowse({ geneData }) {
  const url = buildJBrowseUrl({
    organismId: geneData.organism?.id,
    chromosome: geneData.chromosome?.name,
    start: geneData.start,
    end: geneData.end,
  });

  if (!url) {
    const missingData =
      !geneData.chromosome?.name ||
      geneData.start == null ||
      geneData.end == null ||
      !geneData.organism?.id;
    const message = missingData
      ? `JBrowse visualization not available, incomplete data for gene: ${
          geneData.accession || geneData.geneId || "Unknown"
        }`
      : `No dataset found for organism: ${
          geneData.organism?.name || geneData.organism?.id
        }`;

    return (
      <Box
        sx={{
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
          <Typography
            variant="body2"
            color="error"
            sx={{
              p: 2,
              lineHeight: 1.5,
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {message}
          </Typography>
        </Box>
      </Box>
    );
  }

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
        title="JBrowse"
        width="100%"
        height="700px"
        style={{ border: "none" }}
        tabIndex={-1}
      />
    </Box>
  );
}
