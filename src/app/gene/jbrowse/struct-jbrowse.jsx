"use client";

import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { buildJBrowseUrl } from "@/shared/builduri-jbrowse";

export default function StructJBrowse({ geneData }) {
  const { url, message } = useMemo(() => {
    return buildJBrowseUrl({
      organismId: geneData?.organism?.id,
      chromosome: geneData?.chromosome?.name,
      start: geneData?.start,
      end: geneData?.end,
    });
  }, [
    geneData?.organism?.id,
    geneData?.chromosome?.name,
    geneData?.start,
    geneData?.end,
  ]);

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

  if (!url) {
    return <ErrorBox text={message} />;
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
