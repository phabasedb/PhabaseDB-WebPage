// local

const CDS_COLORS = ["#ACBADA", "#D8DFEE"];

export function renderCdsSequence({ cds = [], strand }) {
  if (!cds.length) return [];

  const orderedCds = strand === "reverse" ? [...cds].reverse() : cds;

  const colorOffset = strand === "reverse" ? 1 : 0;

  return orderedCds.map((cdsItem, index) => ({
    text: cdsItem.sequence,
    color: CDS_COLORS[(index + colorOffset) % CDS_COLORS.length],
  }));
}
