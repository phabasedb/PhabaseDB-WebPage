export const USER_ERROR_MESSAGE =
  "Genome browser is currently unavailable for this gene.";

export const VALID_COORDS_JBROWSE = {
  chromosome: [
    {
      test: (v) => typeof v === "string" && v.trim() !== "",
      message: "Chromosome name is required",
    },
  ],
  start: [
    {
      test: (v) => Number.isInteger(Number(v)) && Number(v) >= 0,
      message: "Start position must be a non-negative integer",
    },
  ],
  end: [
    {
      test: (v) => Number.isInteger(Number(v)) && Number(v) >= 0,
      message: "End position must be a non-negative integer",
    },
  ],
  range: [
    {
      test: ({ start, end }) => Number(start) <= Number(end),
      message: "Start position cannot be greater than end position",
    },
  ],
  assembly: [
    {
      test: (v) => typeof v === "string" && v.trim() !== "",
      message: "Assembly name is required",
    },
  ],
  tracks: [
    {
      test: (v) => Array.isArray(v) && v.length > 0,
      message: "At least one track is required",
    },
  ],
};
