import { useState, useEffect, useMemo } from "react";

export function useSelectedTranscript(transcripts) {
  const [selectedTranscriptId, setSelectedTranscriptId] = useState(null);

  useEffect(() => {
    if (transcripts?.length) {
      setSelectedTranscriptId(transcripts[0].id);
    } else {
      setSelectedTranscriptId(null);
    }
  }, [transcripts]);

  const selectedTranscript = useMemo(() => {
    return transcripts?.find((t) => t.id === selectedTranscriptId) || null;
  }, [transcripts, selectedTranscriptId]);

  return {
    selectedTranscriptId,
    setSelectedTranscriptId,
    selectedTranscript,
  };
}
