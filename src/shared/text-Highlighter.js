//standard

// third party
import React from "react";

//local

/**
 * @param {string} text         Full text.
 * @param {string[]} words      Words or phrases to highlight.
 * @param {("em"|"strong"|"mark")} tag  tag HTML tag that will wrap the word (can be em, strong, mark, etc.).
 * @returns {(string|React.ReactNode)[]}
 */
function highlightText(text, words, tag = "em") {
  if (!words || words.length === 0) return [text];

  const escaped = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, idx) => {
    const found = words.find((w) => w.toLowerCase() === part.toLowerCase());
    if (!found) return part;

    if (tag === "strong") {
      return <strong key={idx}>{part}</strong>;
    } else if (tag === "mark") {
      return <mark key={idx}>{part}</mark>;
    }

    return <em key={idx}>{part}</em>;
  });
}

export default highlightText;
