"use client";

//standard
import { useMemo } from "react";

//third party
import { Box, Typography } from "@mui/material";

//local
import { buildJBrowseUrlPositions } from "@/shared/builduri-jbrowse";
import { datasets } from "@/static/jbrowser/datasets";

export default function StructJBrowse({ geneData }) {
  // Validates the dataset using the organism ID and builds the JBrowse URL
  const { url, message } = useMemo(() => {
    const ds = datasets.find((d) => d._id === geneData?.organism?.id);
    if (!ds) {
      return {
        url: null,
        message:
          "Unable to load the genome browser. No genomic data is currently available for the selected organism.",
      };
    }
    return buildJBrowseUrlPositions({
      chromosome: geneData?.chromosome?.name,
      start: geneData?.start,
      end: geneData?.end,
      assemblyName: ds?.assemblyName,
      tracks: ds?.tracks,
    });
  }, [
    geneData?.organism?.id,
    geneData?.chromosome?.name,
    geneData?.start,
    geneData?.end,
  ]);

  // Error component to display user-friendly messages when something fails
  function ErrorBox({ text }) {
    return (
      <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
        <Typography
          variant="body2"
          color="error"
          sx={{
            p: 2,
            backgroundColor: "white",
            borderRadius: 1,
            lineHeight: 1.5,
            wordBreak: "break-word",
            maxWidth: "90%",
          }}
        >
          {text}
        </Typography>
      </Box>
    );
  }
  // If no valid URL is available, show the error message
  if (!url) {
    return <ErrorBox text={message} />;
  }
  // Renders the genome browser inside an iframe
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
