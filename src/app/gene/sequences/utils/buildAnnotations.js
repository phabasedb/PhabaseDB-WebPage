// local

export function buildTranscriptAnnotations(transcript) {
  if (!transcript) return [];

  return [...(transcript.utrs || []), ...(transcript.cds || [])];
}
