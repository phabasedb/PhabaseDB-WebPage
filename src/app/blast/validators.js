// validators.js
export const isInteger = (s) => /^-?\d+$/.test(s);
export const isFloat = (s) => /^-?\d+(\.\d+)?([eE][-+]?\d+)?$/.test(s);

export function validateEvalue(v) {
  const c = v.trim();
  if (!c) return null;
  if (!isFloat(c)) return "E-value must be a valid number.";
  if (parseFloat(c) <= 0) return "E-value must be greater than 0.";
  return null;
}

export function validateWordSize(v) {
  const c = v.trim();
  if (!c) return null;
  if (!isInteger(c) || parseInt(c, 10) <= 0)
    return "Word size must be a positive integer.";
  return null;
}

export function validateMaxTargetSeqs(v) {
  const c = v.trim();
  if (!c) return null;
  if (!isInteger(c) || parseInt(c, 10) <= 0)
    return "# alignments must be a positive integer.";
  return null;
}
