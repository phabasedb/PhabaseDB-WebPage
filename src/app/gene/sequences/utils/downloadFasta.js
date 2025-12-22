export function downloadFasta({ content, filename }) {
  if (!content) return;

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "sequence.fasta";
  a.click();

  URL.revokeObjectURL(url);
}
