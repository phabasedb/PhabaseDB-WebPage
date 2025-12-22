"use client";

// standard
import { useParams } from "next/navigation";

// third party

// local
import { useGeneById } from "@/components/WebService/gene";
import { useSelectedTranscript } from "../hooks/useSelectedTranscript";
import GeneHandler from "./utils/gene-handler";
import Information from "../information";
import Sequences from "../sequences";

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
  const { gene, organism, chromosome, transcripts } = data;

  const { selectedTranscript, selectedTranscriptId, setSelectedTranscriptId } =
    useSelectedTranscript(transcripts);

  return (
    <>
      <Information
        gene={gene}
        organism={organism}
        chromosome={chromosome}
        transcripts={transcripts}
        selectedTranscriptId={selectedTranscriptId}
        onSelectTranscript={setSelectedTranscriptId}
      />
      <Sequences
        gene={gene}
        chromosome={chromosome}
        selectedTranscript={selectedTranscript}
      />
    </>
  );
}
