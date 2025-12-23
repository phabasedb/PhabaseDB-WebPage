// local
import { VALID_COORDS_JBROWSE } from "./validation";
import { validateFieldsJBrowser } from "./field-validation";

/**
 * Builds a JBrowse URL using genomic coordinates.
 * Intended for the gene JBrowse iframe.
 */
export function buildJBrowseUrlFromCoords({
  chromosome,
  start,
  end,
  assembly,
  tracks,
  baseUrl = process.env.NEXT_PUBLIC_URI_JBROWSE,
  configFile = "config.json",
}) {
  if (!baseUrl) {
    return { url: null, message: "JBrowse base URL is not configured." };
  }

  const validationError = validateFieldsJBrowser(VALID_COORDS_JBROWSE, {
    chromosome,
    start,
    end,
    assembly,
    tracks,
  });

  if (validationError) {
    return { url: null, message: validationError };
  }

  const loc = `${chromosome}:${Number(start)}..${Number(end)}`;

  const params = new URLSearchParams({
    config: configFile,
    assembly,
    loc,
    tracks: tracks.join(","),
  });

  return {
    url: `${baseUrl}?${params.toString()}`,
    message: null,
  };
}
