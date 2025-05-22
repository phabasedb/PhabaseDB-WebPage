"use client";

// standard
import { useState, useEffect, useRef } from "react";

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

  const { data: detail, loading, error } = useGeneById(id || "");

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

  // Refs para secciones
  const jbrowseRef = useRef(null);
  const sequencesRef = useRef(null);

  // Función que pasa a Information para manejar scroll
  const handleNavClick = (target) => {
    switch (target) {
      case "JBROWSER-NV":
        jbrowseRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "SEQUENCES-NV":
        sequencesRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Information
        geneData={detail}
        selectedTranscript={selectedTranscript}
        setSelectedTranscript={setSelectedTranscript}
        onNavClick={handleNavClick}
      />

      <section ref={jbrowseRef} id="jbrowse-section">
        <JBrowse geneData={detail} />
      </section>

      <section ref={sequencesRef} id="sequences-section">
        <Sequences geneData={detail} selectedTranscript={selectedTranscript} />
      </section>
    </>
  );
}
