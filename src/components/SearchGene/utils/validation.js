export const MIN_INPUT_LENGTH = 3;

export const VALID_INPUT_TERM = [
  {
    test: (v) => typeof v === "string",
    message: "Invalid value. The search term must be a string.",
  },
  {
    test: (v) => v.trim() !== "",
    message: "The field cannot be empty.",
  },
  {
    test: (v) => v.trim().length >= MIN_INPUT_LENGTH,
    message: `The term cannot be less than ${MIN_INPUT_LENGTH} characters.`,
  },
  {
    test: (v) => /^[A-Za-z0-9._\- ]+$/.test(v),
    message:
      "Only letters, numbers, dots, hyphens, underscores, and inner spaces are allowed.",
  },
];
