//standard

// third party

//local
export const MIN_INPUT_LENGTH = 3;
export const MIN_TERM_LENGTH = 3;

export const VALID_URL_TERM = [
  { test: (v) => typeof v === "string", message: "Invalid term." },
  { test: (v) => v.trim() !== "", message: "Search term cannot be empty." },
  {
    test: (v) => v.trim().length >= MIN_TERM_LENGTH,
    message: `Search term must be at least ${MIN_TERM_LENGTH} characters.`,
  },
  {
    test: (v) => /^[A-Za-z0-9._\- ]+$/.test(v),
    message:
      "Only letters, numbers, dots, hyphens, underscores, and inner spaces are allowed.",
  },
];

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
