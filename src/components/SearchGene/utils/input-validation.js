import {
  ALPHANUMERIC_PATTERN,
  MAX_INPUT_LENGTH,
  MIN_INPUT_LENGTH,
} from "shared/const-validateds";

// validation rules as an array of { test, message }
const validators = [
  {
    test: (value) => value.trim() !== "",
    message: "The field cannot be empty.",
  },
  {
    test: (value) => value.length <= MAX_INPUT_LENGTH,
    message: `The term cannot exceed ${MAX_INPUT_LENGTH} characters.`,
  },
  {
    test: (value) => value.length >= MIN_INPUT_LENGTH,
    message: `The term cannot be less than ${MIN_INPUT_LENGTH} characters.`,
  } /*
  {
    test: (value) => ALPHANUMERIC_PATTERN.test(value),
    message: "Only alphanumeric characters are allowed.",
  },*/,
];

/**
 * Runs through each validator and sets error message on first failure.
 * @param {string} value
 * @param {function(string): void} setError  state setter for error message
 * @returns {boolean} true if all tests pass, false otherwise
 */
export function validateInput(value, setError) {
  for (const { test, message } of validators) {
    if (!test(value)) {
      setError(message);
      return false;
    }
  }
  setError("");
  return true;
}
