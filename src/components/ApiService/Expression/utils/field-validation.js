//standard

// third party

//local

/**
 * Runs a set of validation rules on a given value and returns
 * the first error message found, or null if all pass.
 *
 * @param {*} value - The value to validate.
 * @param {Array<{ test: (v: any) => boolean, message: string }>} rules - Validation rules.
 * @returns {string|null} - The error message or null if valid.
 */
export function validateField(value, rules) {
  for (const rule of rules) {
    if (!rule.test(value)) {
      return rule.message;
    }
  }
  return null;
}
