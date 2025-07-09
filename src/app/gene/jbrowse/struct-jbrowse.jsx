"use client";

//standard
import { useMemo } from "react";

//third party
import { Box } from "@mui/material";

//local
import { buildJBrowseUrlPositions } from "@/shared/jbrowser/builduri-jbrowse";
import { datasets } from "@/static/jbrowser/datasets";
import ErrorBoxPageGene from "../shared/utils/error-box";

export default function StructJBrowse({ geneData }) {
  // Validates the dataset using the organism ID and builds the JBrowse URL
  const { url, message } = useMemo(() => {
    const ds = datasets.find((d) => d.id === geneData?.organism?.id);
    if (!ds) {
      return {
        url: null,
        message:
          "The genome browser could not be loaded. No genomic data is currently available for the selected organism. Please try again later or contact an administrator.",
      };
    }
    return buildJBrowseUrlPositions({
      chromosome: geneData?.chromosome?.name,
      start: geneData?.start,
      end: geneData?.end,
      assemblyName: ds?.assemblyName || "",
      tracks: ds?.tracks || "",
    });
  }, [
    datasets,
    geneData?.organism?.id,
    geneData?.chromosome?.name,
    geneData?.start,
    geneData?.end,
  ]);

  // If no valid URL is available, show the error message
  if (!url) {
    return <ErrorBoxPageGene text={message} />;
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
