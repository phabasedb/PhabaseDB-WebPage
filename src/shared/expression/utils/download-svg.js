// standard

// third party

// local

/**
 * Downloads an SVG node as a .svg file
 * @param {SVGElement} svgNode - Reference to the SVG element
 * @param {string} filename - File name with .svg extension
 */
export function downloadSVG(svgNode, filename = "chart.svg") {
  if (!svgNode) return;

  // Serialize SVG to string
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svgNode);

  // Create a Blob and a download URL
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  // Create and trigger the download <a> element
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Revoke the URL to free memory
  URL.revokeObjectURL(url);
}
