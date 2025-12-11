"use client";

//standard
import { useMemo } from "react";

//third party
import { Box } from "@mui/material";

//local
import { createJBrowseUrlFromCoords } from "@/shared/jbrowse/builduri-jbrowse";
import { datasets } from "@/static/jbrowse/datasets";
import ErrorBoxPageGene from "../shared/utils/error-box";

export default function StructJBrowse({ gene, organism, chromosome }) {
  const { url, internalMessage, userMessage } = useMemo(() => {
    const ds = datasets.find((d) => d.id === organism?.id);

    if (!ds) {
      const msg = "No genomic data available for this gene/organism.";
      return {
        url: null,
        internalMessage: "Dataset not found",
        userMessage: msg,
      };
    }

    const { url, message } = createJBrowseUrlFromCoords({
      chromosome: chromosome?.name,
      start: gene?.start,
      end: gene?.end,
      assembly: ds.assembly,
      tracks: ds.tracks,
    });

    if (!url) {
      return {
        url: null,
        internalMessage: message,
        userMessage: "Unable to load genome browser. Please try again later.",
      };
    }

    return { url, internalMessage: null, userMessage: null };
  }, [gene, organism, chromosome]);

  if (!url) {
    if (internalMessage) console.error("JBrowse Error:", internalMessage);
    return <ErrorBoxPageGene text={userMessage} />;
  }

  return (
    <Box
      sx={{
        width: "90%",
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: 5,
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
