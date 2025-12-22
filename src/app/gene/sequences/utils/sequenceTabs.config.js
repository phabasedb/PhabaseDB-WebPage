// local
import GenomicTab from "../tabs/GenomicTab";
import TranscriptTab from "../tabs/TranscriptTab";
import CdsTab from "../tabs/CdsTab";
import PeptideTab from "../tabs/PeptideTab";
import { wrapSequence } from "./wrapSequence";

export const SEQUENCE_TABS = [
  {
    value: "genomic",
    label: (len) => `Genomic [${len}]`,
    getLength: ({ gene }) => gene?.length,

    render: ({ gene, chromosome, selectedTranscript }) => (
      <GenomicTab
        gene={gene}
        chromosome={chromosome}
        selectedTranscript={selectedTranscript}
      />
    ),

    buildFasta: ({ gene, chromosome }) => {
      if (!gene?.sequence) return null;

      return `>${gene.accessionId} | ${chromosome.name}: ${gene.start}..${
        gene.end
      } ${gene.strand}
${wrapSequence(gene.sequence)}`;
    },
  },

  {
    value: "transcript",
    label: (len) => `Transcript [${len}]`,
    requiresTranscript: true,
    getLength: ({ selectedTranscript }) => selectedTranscript?.length,

    render: ({ selectedTranscript, chromosome }) => (
      <TranscriptTab
        selectedTranscript={selectedTranscript}
        chromosome={chromosome}
      />
    ),

    buildFasta: ({ selectedTranscript, chromosome }) => {
      if (!selectedTranscript?.sequence) return null;

      return `>${selectedTranscript.accessionId} | ${chromosome?.name} : ${
        selectedTranscript.start
      }..${selectedTranscript.end} ${selectedTranscript.strand}
${wrapSequence(selectedTranscript.sequence)}`;
    },
  },

  {
    value: "cds",
    label: (len) => `CDS [${len}]`,
    requiresTranscript: true,
    getLength: ({ selectedTranscript }) => selectedTranscript?.product?.length,

    render: ({ selectedTranscript }) => (
      <CdsTab selectedTranscript={selectedTranscript} />
    ),

    buildFasta: ({ selectedTranscript }) => {
      const seq = selectedTranscript?.product?.sequence;
      if (!seq) return null;

      return `>${selectedTranscript.accessionId} CDS
${wrapSequence(seq)}`;
    },
  },

  {
    value: "protein",
    label: (len) => `Peptide [${len}]`,
    requiresTranscript: true,
    getLength: ({ selectedTranscript }) =>
      selectedTranscript?.product?.aminoacidSequence?.length,

    render: ({ selectedTranscript }) => (
      <PeptideTab selectedTranscript={selectedTranscript} />
    ),

    buildFasta: ({ selectedTranscript }) => {
      const seq = selectedTranscript?.product?.aminoacidSequence;
      if (!seq) return null;

      return `>${selectedTranscript.accessionId} Peptide
${wrapSequence(seq)}`;
    },
  },
];
