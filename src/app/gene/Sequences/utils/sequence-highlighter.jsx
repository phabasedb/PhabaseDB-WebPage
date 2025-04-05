// standard
// third party
// local

// Define color pairs for highlighting sequence elements (e.g., 5' UTR, 3' UTR, CDS)
const COLOR_PAIRS = {
  five_prime_UTR: ["#AED2B3", "#D7E9D9"],
  three_prime_UTR: ["#CBA8C5", "#E3D0E0"],
  CDS: ["#ACBADA", "#D8DFEE"],
};

// Renders a gene/transcript sequence with highlighted annotations (UTRs and CDS)
export function renderSequenceGenTrans(sequence, start, annotations = []) {
  if (!annotations || annotations.length === 0) return sequence;

  const seqLength = sequence.length;
  // Create an array to store highlight info (color and priority) for each character in the sequence
  const highlights = Array.from({ length: seqLength }, () => ({
    color: null,
    priority: 0,
  }));

  // Counters to alternate colors for each annotation type
  const colorCounters = {
    five_prime_UTR: 0,
    three_prime_UTR: 0,
    CDS: 0,
  };

  // Apply an annotation to the highlights array
  const applyAnnotation = (absStart, absEnd, type, priority) => {
    const relStart = absStart - start;
    const relEnd = absEnd - start + 1;

    // Select alternating color based on annotation type
    const colors = COLOR_PAIRS[type] || ["#FFFFFF"]; // Fallback to white if type is not defined
    const color = colors[colorCounters[type] % colors.length];

    // Increment the counter for the next annotation of the same type
    colorCounters[type]++;

    // Apply highlight color to positions with lower priority being overridden by higher priority annotations
    for (let i = relStart; i < relEnd && i < seqLength; i++) {
      if (priority > highlights[i].priority) {
        highlights[i] = { color, priority };
      }
    }
  };

  // Process each annotation and apply it with appropriate priority
  annotations.forEach((ann) => {
    let priority = 1;
    if (ann.type === "five_prime_UTR" || ann.type === "three_prime_UTR") {
      priority = 2;
    }
    applyAnnotation(ann.start, ann.end, ann.type, priority);
  });

  // Build segments of text with alternating colors
  const segments = [];
  let currentColor = highlights[0].color;
  let currentText = sequence[0];

  for (let i = 1; i < seqLength; i++) {
    const { color } = highlights[i];
    if (color === currentColor) {
      currentText += sequence[i];
    } else {
      segments.push({
        text: currentText,
        highlight: currentColor !== null,
        color: currentColor,
      });
      currentText = sequence[i];
      currentColor = color;
    }
  }
  segments.push({
    text: currentText,
    highlight: currentColor !== null,
    color: currentColor,
  });

  // Return an array of JSX spans for each segment, with background if highlighted
  return segments.map((seg, idx) =>
    seg.highlight ? (
      <span key={idx} style={{ backgroundColor: seg.color }}>
        {seg.text}
      </span>
    ) : (
      <span key={idx}>{seg.text}</span>
    )
  );
}
// ---

// Renders the CDS sequence with highlighted annotations
export function renderSequenceCDS(sequence, start, annotations = []) {
  if (!sequence || !annotations || annotations.length === 0) return null;

  const seqLength = sequence.length;
  // Initialize an array to store highlight information for each character
  const highlights = Array.from({ length: seqLength }, () => ({
    color: null,
    priority: 0,
  }));

  // Counter to alternate colors for CDS annotations
  let cdsColorCounter = 0;

  // Function to apply a CDS annotation highlight
  const applyCDSAnnotation = (absStart, absEnd) => {
    const relStart = absStart - start;
    const relEnd = absEnd - start + 1;

    // Select alternating color for CDS
    const colors = COLOR_PAIRS["CDS"];
    const color = colors[cdsColorCounter % colors.length];

    // Increment counter for the next CDS
    cdsColorCounter++;

    // Apply highlight for valid positions
    for (let i = relStart; i < relEnd && i < seqLength; i++) {
      if (i >= 0) {
        highlights[i] = { color, priority: 1 };
      }
    }
  };

  // Filter and sort only CDS annotations
  const cdsAnnotations = annotations
    .filter((ann) => ann.type === "CDS")
    .sort((a, b) => a.start - b.start);

  // Return null if no CDS annotations are found
  if (cdsAnnotations.length === 0) return null;

  // Apply CDS annotations to the highlights array
  cdsAnnotations.forEach((ann) => {
    applyCDSAnnotation(ann.start, ann.end);
  });

  // Build segments for highlighted CDS parts
  const segments = [];
  let currentColor = null;
  let currentText = "";

  for (let i = 0; i < seqLength; i++) {
    const { color } = highlights[i];
    if (color) {
      // If the same color continues, accumulate the sequence
      if (color === currentColor) {
        currentText += sequence[i];
      } else {
        // If the color changes, push the accumulated segment and start a new one
        if (currentText) {
          segments.push({
            text: currentText,
            color: currentColor,
          });
        }
        currentText = sequence[i];
        currentColor = color;
      }
    } else if (currentText) {
      // If no color is applied and text was accumulated, push the segment
      segments.push({
        text: currentText,
        color: currentColor,
      });
      currentText = "";
      currentColor = null;
    }
  }

  // Add the final segment if exists
  if (currentText) {
    segments.push({
      text: currentText,
      color: currentColor,
    });
  }

  // Return only the highlighted segments as JSX elements
  return segments.map((seg, idx) => (
    <span key={idx} style={{ backgroundColor: seg.color }}>
      {seg.text}
    </span>
  ));
}
// ---
