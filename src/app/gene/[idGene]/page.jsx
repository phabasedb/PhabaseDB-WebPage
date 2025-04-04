"use client";

// standard
import { useState, useEffect, useMemo } from "react";

// third party
import { useParams } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";

// local
import InformationGene from "../Information";
import SequencesGene from "../Sequences";
import JBrowser from "../JBrowse";
import { useGetSearchResultIdGene } from "@/components/WebService/Search";

// Custom hook to automatically select the first transcript by default
function useSelectedTranscript(formattedData) {
  const [selectedTranscript, setSelectedTranscript] = useState(null);

  useEffect(() => {
    if (formattedData && formattedData.length > 0 && !selectedTranscript) {
      const geneData = formattedData[0];
      if (geneData.transcripts?.length > 0) {
        setSelectedTranscript(geneData.transcripts[0]);
      }
    }
  }, [formattedData]);

  return [selectedTranscript, setSelectedTranscript];
}
// ---

export default function GenePage() {
  const { idGene } = useParams();
  const { formattedData, loading, error } = useGetSearchResultIdGene(idGene);
  const [selectedTranscript, setSelectedTranscript] =
    useSelectedTranscript(formattedData);

  const geneData = useMemo(() => formattedData?.[0] || null, [formattedData]);

  if (loading)
    return (
      <Box sx={{ width: "100%", textAlign: "center", my: 3 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 3,
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
            An error occurred while loading the data for gene {idGene}. Please
            try again.
          </Typography>
        </Box>
      </Box>
    );

  if (!geneData) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 3,
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
            No data was found for the gene: {idGene}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <InformationGene
        geneData={geneData}
        selectedTranscript={selectedTranscript}
        setSelectedTranscript={setSelectedTranscript}
      />
      <JBrowser geneData={geneData} />
      <SequencesGene
        geneData={geneData}
        selectedTranscript={selectedTranscript}
      />
    </>
  );
}
