/**
 * Validates data against a validation schema.
 * Returns the first error message found, or null if valid.
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
