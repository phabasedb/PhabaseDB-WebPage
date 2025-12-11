// standard

// third party

// local
import { VALID_SEARCH_JBR } from "../const-validateds";
import { validateFieldsJBrowser } from "./utils/field-validation";

/**
 * Constructs the JBrowse URL from a sessionDefect object.
 * @param {Object} sessionDefect – JBrowse session object
 * @param {string} [baseUrl] – Base JBrowse URL (default: env)
 * @param {string} [options.configFile] - Config file name (default: config.json)
 * @returns {string|null} - Full JBrowse URL or null if sessionObject missing
 */
export function createJBrowseUrlFromSession({
  sessionDefect,
  baseUrl = process.env.NEXT_PUBLIC_URI_JBROWSE,
  configFile = "config.json",
}) {
  if (!sessionDefect) return null;

  const encodedSession = encodeURIComponent(JSON.stringify(sessionDefect));
  return `${baseUrl}?config=${configFile}&session=spec-${encodedSession}`;
}

/**
 * Builds a JBrowse URL using individual genomic parameters, with validation.
 * @param {Object} params
 * @param {string} params.chromosome - Chromosome name
 * @param {number|string} params.start - Gene start position
 * @param {number|string} params.end - Gene end position
 * @param {string} params.assembly - Reference genome assembly name
 * @param {string[]} params.tracks - Array of track names
 * @param {string} [params.configFile] - Config file name (default: config.json)
 * @param {string} [params.baseUrl] - Base JBrowse URL (default: env)
 * @returns {{ url: string|null, message: string|null }}
 */
export function createJBrowseUrlFromCoords({
  chromosome,
  start,
  end,
  assembly,
  tracks,
  configFile = "config.json",
  baseUrl = process.env.NEXT_PUBLIC_URI_JBROWSE,
}) {
  const validationError = validateFieldsJBrowser(VALID_SEARCH_JBR, {
    chromosome,
    start,
    end,
    assembly,
    tracks,
  });

  if (validationError) {
    return { url: null, message: validationError };
  }

  const locationParam = `${chromosome}:${Number(start)}..${Number(end)}`;
  const tracksQuery = tracks.join(",");
  const queryParams = new URLSearchParams({
    config: configFile,
    loc: locationParam,
    assembly,
    tracks: tracksQuery,
  }).toString();

  return { url: `${baseUrl}?${queryParams}`, message: null };
}
