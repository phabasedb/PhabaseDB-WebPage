// local

export function getRelativePositions(
  absStart,
  absEnd,
  start,
  seqLength,
  strand
) {
  if (strand === "reverse") {
    return {
      relStart: seqLength - (absEnd - start + 1),
      relEnd: seqLength - (absStart - start),
    };
  }

  return {
    relStart: absStart - start,
    relEnd: absEnd - start + 1,
  };
}
