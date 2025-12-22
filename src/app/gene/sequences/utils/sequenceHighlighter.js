// local
import { getRelativePositions } from "./getRelativePositions";

const COLOR_MAP = {
  five_prime_UTR: ["#AED2B3", "#D7E9D9"],
  three_prime_UTR: ["#CBA8C5", "#E3D0E0"],
  CDS: ["#ACBADA", "#D8DFEE"],
};

const PRIORITY = {
  five_prime_UTR: 1,
  three_prime_UTR: 1,
  CDS: 2,
};

export function buildHighlightedSegments({
  sequence,
  start,
  strand,
  annotations = [],
}) {
  const seqLength = sequence.length;
  if (!seqLength || annotations.length === 0) {
    return [{ text: sequence, color: null }];
  }

  const highlights = Array.from({ length: seqLength }, () => ({
    color: null,
    priority: 0,
  }));

  const counters = {
    five_prime_UTR: 0,
    three_prime_UTR: 0,
    CDS: 0,
  };

  annotations.forEach((ann) => {
    const { relStart, relEnd } = getRelativePositions(
      ann.start,
      ann.end,
      start,
      seqLength,
      strand
    );

    const colors = COLOR_MAP[ann.type];
    if (!colors) return;

    const color = colors[counters[ann.type] % colors.length];
    counters[ann.type]++;

    for (let i = relStart; i < relEnd && i < seqLength; i++) {
      if (i >= 0 && PRIORITY[ann.type] > highlights[i].priority) {
        highlights[i] = { color, priority: PRIORITY[ann.type] };
      }
    }
  });

  // construir segmentos
  const segments = [];
  let currentColor = highlights[0]?.color;
  let buffer = sequence[0] || "";

  for (let i = 1; i < seqLength; i++) {
    const nextColor = highlights[i].color;
    if (nextColor === currentColor) {
      buffer += sequence[i];
    } else {
      segments.push({ text: buffer, color: currentColor });
      buffer = sequence[i];
      currentColor = nextColor;
    }
  }

  segments.push({ text: buffer, color: currentColor });

  return segments;
}
