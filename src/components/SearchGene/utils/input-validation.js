//standard

// third party

//local
import { VALID_INPUT_TERM } from "./validation";

/**
 * Runs through each validator and sets error message on first failure.
 * @param {string} value
 * @param {function(string): void} setError  state setter for error message
 * @returns {boolean} true if all tests pass, false otherwise
 */
export function validateInput(value, setError) {
  for (const { test, message } of VALID_INPUT_TERM) {
    if (!test(value)) {
      setError(message);
      return false;
    }
  }
  setError("");
  return true;
}
