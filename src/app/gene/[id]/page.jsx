"use client";

// standard
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

// third party

// local
import GeneHandler from "./utils/gene-handler";
import Information from "../information";
import Sequences from "../sequences";
import JBrowse from "../jbrowse";
import Expression from "../expression";
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

export default function GenePage() {
  // The id is extracted from the URL and passed to the gene handler.
  const { id } = useParams();
  const { data: detail, loading, error } = useGeneById(id);

  return (
    <GeneHandler loading={loading} error={error} data={detail} idGene={id}>
      <InnerGenePage detail={detail} />
    </GeneHandler>
  );
}

function InnerGenePage({ detail }) {
  const [selectedTranscript, setSelectedTranscript] =
    useSelectedTranscript(detail);

  // Refs for specific page sections to enable smooth scrolling.
  const jbrowseRef = useRef(null);
  const sequencesRef = useRef(null);
  const expressionRef = useRef(null);

  // Navigation function passed to the Information component to scroll to specific sections.
  const handleNavClick = (target) => {
    switch (target) {
      case "JBROWSER-NV":
        jbrowseRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "SEQUENCES-NV":
        sequencesRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "EXPRESSION-NV":
        expressionRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  // Page view structured into multiple sections:
  // general information, genome browser (JBrowse), sequences, and gene expression.
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

      <section ref={expressionRef} id="expression-section">
        <Expression geneData={detail} selectedTranscript={selectedTranscript} />
      </section>
    </>
  );
}
