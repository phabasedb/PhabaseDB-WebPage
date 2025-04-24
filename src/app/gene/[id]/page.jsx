"use client";

// standard
import { useState, useEffect, useMemo } from "react";

// third party
import { useParams } from "next/navigation";

// local
import GeneHandler from "./utils/gene-handler";
import Information from "../information";
import Sequences from "../sequences";
import JBrowse from "../jbrowse";
import { useGeneById } from "@/components/WebService/Search";

// Custom hook to automatically select the first transcript by default
function useSelectedTranscript(formattedDetail) {
  const [sel, setSel] = useState(null);
  useEffect(() => {
    if (formattedDetail?.transcripts?.length && !sel) {
      setSel(formattedDetail.transcripts[0]);
    }
  }, [formattedDetail]);
  return [sel, setSel];
}
// ---

export default function GenePage() {
  const { id } = useParams();

  // aquí obtienes loading, error y el detalle mapeado (o null)
  const { data: detail, loading, error } = useGeneById(id || "");

  // manejador de estados vacío/hubo error/ok
  return (
    <GeneHandler
      loading={loading}
      error={error}
      data={detail ? [detail] : []}
      idGene={id}
    >
      <InnerGenePage detail={detail} />
    </GeneHandler>
  );
}

function InnerGenePage({ detail }) {
  const [selectedTranscript, setSelectedTranscript] =
    useSelectedTranscript(detail);

  return (
    <>
      <Information
        geneData={detail}
        selectedTranscript={selectedTranscript}
        setSelectedTranscript={setSelectedTranscript}
      />
      <JBrowse geneData={detail} />
      <Sequences geneData={detail} selectedTranscript={selectedTranscript} />
    </>
  );
}
