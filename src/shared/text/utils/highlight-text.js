/**
 * @param {string} text Full text.
 * @param {string[]} words Words or phrases to highlight.
 * @param {("em"|"strong"|"mark")} tag HTML tag wrapper.
 * @returns {(string|React.ReactNode)[]}
 */
function highlightText(text, words, tag = "em") {
  if (!words?.length) return [text];

  const Tag = tag;
  const escaped = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(pattern);
  const lowerWords = words.map((w) => w.toLowerCase());

  return parts.map((part, idx) =>
    lowerWords.includes(part.toLowerCase()) ? <Tag key={idx}>{part}</Tag> : part
  );
}

export default highlightText;
