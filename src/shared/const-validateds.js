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
      message:
        "Something went wrong: chromosome name is required. Please try again later or contact an administrator.",
    },
  ],
  start: [
    {
      test: (v) => Number.isInteger(Number(v)) && Number(v) >= 0,
      message:
        "Something went wrong: start position must be a non-negative integer. Please try again later or contact an administrator.",
    },
  ],
  end: [
    {
      test: (v) => Number.isInteger(Number(v)) && Number(v) >= 0,
      message:
        "Something went wrong: end position must be a non-negative integer. Please try again later or contact an administrator.",
    },
  ],
  range: [
    {
      test: ({ start, end }) => Number(start) <= Number(end),
      message:
        "Something went wrong: start position cannot be greater than end position. Please try again later or contact an administrator.",
    },
  ],
  assemblyName: [
    {
      test: (a) => typeof a === "string" && a.trim() !== "",
      message:
        "Something went wrong: reference genome (assembly name) is required. Please try again later or contact an administrator.",
    },
  ],
  tracks: [
    {
      test: (arr) => Array.isArray(arr) && arr.length > 0,
      message:
        "Something went wrong: at least one track must be provided. Please try again later or contact an administrator.",
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
      message:
        "Something went wrong: gene ID cannot be empty. Please try again later or contact an administrator.",
    },
    {
      test: (v) => v.length >= MIN_INPUT_LENGTH,
      message: `Something went wrong: gene ID must be at least ${MIN_INPUT_LENGTH} characters long. Please try again later or contact an administrator.`,
    },
  ],

  ids: [
    {
      test: (arr) => Array.isArray(arr) && arr.length > 0,
      message:
        "Something went wrong: gene ID list cannot be empty. Please try again later or contact an administrator.",
    },
    {
      test: (arr) => arr.every((v) => typeof v === "string" && v.trim() !== ""),
      message:
        "Something went wrong: each gene ID must be a non-empty string. Please try again later or contact an administrator.",
    },
  ],

  columns: [
    {
      test: (arr) => Array.isArray(arr) && arr.length > 0,
      message:
        "Something went wrong: columns list cannot be empty. Please try again later or contact an administrator.",
    },
    {
      test: (arr) => arr.every((v) => typeof v === "string" && v.trim() !== ""),
      message:
        "Something went wrong: each column name must be a non-empty string. Please try again later or contact an administrator.",
    },
  ],

  path: [
    {
      test: (p) => typeof p === "string" && p.trim() !== "",
      message:
        "Something went wrong: path cannot be empty. Please try again later or contact an administrator.",
    },
    {
      test: (p) => p.endsWith(".csv"),
      message:
        "Something went wrong: path must point to a .csv file. Please try again later or contact an administrator.",
    },
  ],
};
