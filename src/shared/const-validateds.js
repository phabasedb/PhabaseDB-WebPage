//standard

// third party

//local

/**
 * Pattern: Only letters A–Z (uppercase and lowercase) and digits 0–9
 */
export const ALPHANUMERIC_PATTERN = /^[A-Za-z0-9]+$/;

/**
 * Maximum character limit for search fields and similar inputs
 */
export const MAX_INPUT_LENGTH = 50;

/**
 * Minimum character limit for search fields and similar entries
 */
export const MIN_INPUT_LENGTH = 3;

/**
 * Validation rules for single-term gene searches (e.g., search input field)
 */
export const VALID_SEARCH_TERM = [
  {
    test: (value) => value.trim() !== "",
    message: "The field cannot be empty.",
  },
  {
    test: (value) => value.length >= MIN_INPUT_LENGTH,
    message: `The term cannot be less than ${MIN_INPUT_LENGTH} characters.`,
  },
];

/**
 * Validation rules for building JBrowse URL using position-based input
 */
export const VALID_SEARCH_JBR = {
  chromosome: [
    {
      test: (c) => typeof c === "string" && c.trim() !== "",
      message: "Chromosome name is required.",
    },
  ],
  start: [
    {
      test: (v) => Number.isInteger(Number(v)) && Number(v) >= 0,
      message: "Start position must be a non-negative integer.",
    },
  ],
  end: [
    {
      test: (v) => Number.isInteger(Number(v)) && Number(v) >= 0,
      message: "End position must be a non-negative integer.",
    },
  ],
  range: [
    {
      test: ({ start, end }) => Number(start) <= Number(end),
      message: "Start position cannot be greater than end position.",
    },
  ],
  assemblyName: [
    {
      test: (a) => typeof a === "string" && a.trim() !== "",
      message: "Reference genome (assembly name) is required.",
    },
  ],
  tracks: [
    {
      test: (arr) => Array.isArray(arr) && arr.length > 0,
      message: "At least one track must be provided.",
    },
  ],
};

/**
 * Validation rules for expression matrix input (IDs, columns, paths, etc.)
 */
export const VALID_SEARCH_EXP = {
  id: [
    {
      test: (v) => typeof v === "string" && v.trim() !== "",
      message: "Gene ID cannot be empty.",
    },
    {
      test: (v) => v.length >= MIN_INPUT_LENGTH,
      message: `Gene ID must be at least ${MIN_INPUT_LENGTH} characters.`,
    },
  ],

  ids: [
    {
      test: (arr) => Array.isArray(arr) && arr.length > 0,
      message: "Gene ID list cannot be empty.",
    },
    {
      test: (arr) => arr.every((v) => typeof v === "string" && v.trim() !== ""),
      message: "Each gene ID must be a non-empty string.",
    },
  ],

  columns: [
    {
      test: (arr) => Array.isArray(arr) && arr.length > 0,
      message: "Columns array cannot be empty.",
    },
    {
      test: (arr) => arr.every((v) => typeof v === "string" && v.trim() !== ""),
      message: "Each column name must be a non-empty string.",
    },
  ],

  path: [
    {
      test: (p) => typeof p === "string" && p.trim() !== "",
      message: "Path cannot be empty.",
    },
    {
      test: (p) => p.endsWith(".csv"),
      message: "Path must point to a .csv file.",
    },
  ],
};
