//standard

// third party

//local

export function validateField(value, rules) {
  for (const rule of rules) {
    if (!rule.test(value)) {
      return rule.message;
    }
  }
  return null;
}
