"use client";

// standard
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

// third party

// local
import { useGeneById } from "@/components/WebService/gene";
import GeneHandler from "./utils/gene-handler";

import Information from "../information";
import Sequences from "../sequences";
import JBrowse from "../jbrowse";
import Expression from "../expression";

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
  const { id } = useParams();
  const decodedId = decodeURIComponent(id).trim();

  const { data, loading, error } = useGeneById(decodedId);

  return (
    <GeneHandler loading={loading} error={error} data={data}>
      <InnerGenePage data={data} />
    </GeneHandler>
  );
}

function InnerGenePage({ data }) {
  const [selectedTranscript, setSelectedTranscript] =
    useSelectedTranscript(data);

  const { gene, organism, chromosome, transcripts } = data;

  const jbrowseRef = useRef(null);
  const sequencesRef = useRef(null);
  const expressionRef = useRef(null);

  const handleNavClick = (target) => {
    const mapRef = {
      "JBROWSER-NV": jbrowseRef,
      "SEQUENCES-NV": sequencesRef,
      "EXPRESSION-NV": expressionRef,
    };
    mapRef[target]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Information
        gene={gene}
        organism={organism}
        chromosome={chromosome}
        transcripts={transcripts}
        selectedTranscript={selectedTranscript}
        setSelectedTranscript={setSelectedTranscript}
        onNavClick={handleNavClick}
      />

      <section ref={sequencesRef} id="sequences-section">
        <Sequences geneData={data} selectedTranscript={selectedTranscript} />
      </section>

      <section ref={jbrowseRef} id="jbrowse-section">
        <JBrowse gene={gene} organism={organism} chromosome={chromosome} />
      </section>

      {["PDBJAMAPAORG000001"].includes(data.organism.id) && (
        <section ref={expressionRef} id="expression-section">
          <Expression
            gene={gene}
            organism={organism}
            selectedTranscript={selectedTranscript}
          />
        </section>
      )}
    </>
  );
}
