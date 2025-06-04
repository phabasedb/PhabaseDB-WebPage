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

// validation rules as an array of { test, message }
export const VALID_SEARCH = [
  {
    test: (value) => value.trim() !== "",
    message: "The field cannot be empty.",
  },
  {
    test: (value) => value.length >= MIN_INPUT_LENGTH,
    message: `The term cannot be less than ${MIN_INPUT_LENGTH} characters.`,
  },
];
