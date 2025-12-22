export function wrapSequence(sequence, lineLength = 60) {
  if (!sequence) return "";

  return sequence.match(new RegExp(`.{1,${lineLength}}`, "g")).join("\n");
}
