"use client";

// standard
import { useMemo } from "react";

// third party
import { Box } from "@mui/material";

// local
import { buildJBrowseUrlFromCoords } from "@/shared/jbrowse/build-url-from-coords";
import { datasets } from "@/static/jbrowse/datasets";
import ErrorBoxPageGene from "../shared/components/ErrorBox";
import { USER_ERROR_MESSAGE } from "@/shared/jbrowse/validation";

export default function StructJBrowse({ gene, organism, chromosome }) {
  const { url, internalMessage } = useMemo(() => {
    if (!gene || !organism || !chromosome) {
      return {
        url: null,
        internalMessage: "Missing gene, organism or chromosome context",
      };
    }

    const dataset = datasets.find((d) => d.id === organism.id);

    if (!dataset) {
      return {
        url: null,
        internalMessage: `Dataset not found for organism id: ${organism.id}`,
      };
    }

    const { url, message } = buildJBrowseUrlFromCoords({
      chromosome: chromosome.name,
      start: gene.start,
      end: gene.end,
      assembly: dataset.assembly,
      tracks: dataset.tracks,
    });

    if (!url) {
      return {
        url: null,
        internalMessage: message,
      };
    }

    return { url, internalMessage: null };
  }, [gene, organism, chromosome]);

  if (!url) {
    if (internalMessage) {
      console.error("JBrowse:", internalMessage);
    }

    return <ErrorBoxPageGene text={USER_ERROR_MESSAGE} />;
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
