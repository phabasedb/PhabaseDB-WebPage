//standard

// third party

//local

/**
 * General validation function for objects based on a schema
 * @param {Object} schema - Object with keys mapping to arrays of validation rules
 * @param {Object} data - Object to validate
 * @returns {string|null} First error message found, or null if valid
 */
export function validateFieldsJBrowser(schema, data) {
  for (const key in schema) {
    const rules = schema[key];

    for (const rule of rules) {
      const value = key === "range" ? data : data[key];
      if (!rule.test(value)) {
        return rule.message;
      }
    }
  }
  return null;
}
