// validators.js
export const isInteger = (s) => /^-?\d+$/.test(s);
export const isFloat = (s) => /^-?\d+(\.\d+)?([eE][-+]?\d+)?$/.test(s);

export function validateEvalue(v) {
  const c = v.trim();
  if (!c) return null;
  if (!isFloat(c)) return "E-value debe ser un número válido.";
  if (parseFloat(c) <= 0) return "E-value debe ser mayor a 0.";
  return null;
}

export function validateWordSize(v) {
  const c = v.trim();
  if (!c) return null;
  if (!isInteger(c) || parseInt(c, 10) <= 0)
    return "Word size debe ser un entero positivo.";
  return null;
}

export function validateMaxTargetSeqs(v) {
  const c = v.trim();
  if (!c) return null;
  if (!isInteger(c) || parseInt(c, 10) <= 0)
    return "# alignments debe ser un entero positivo.";
  return null;
}
