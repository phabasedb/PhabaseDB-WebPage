// standard

// third party

// local
import { VALID_SEARCH_JBR } from "../const-validateds";
import { validateFieldsJBrowser } from "./utils/field-validation";

/**
 * Constructs the JBrowse URL from a sessionDefect object.
 * @param {Object} sessionDefect – The session object to be serialized
 * @param {string} [baseUrl] – Optional base URL (default: NEXT_PUBLIC_URI_JBROWSE)
 * @returns {string|null} Full URL or null if no sessionDefect is provided
 */
export function buildJBrowseUrlDefectSession({
  sessionDefect,
  baseUrl = process.env.NEXT_PUBLIC_URI_JBROWSE,
}) {
  if (!sessionDefect) return null;

  const json = JSON.stringify(sessionDefect);
  return `${baseUrl}?config=config.json&session=spec-${json}`;
}

/**
 * Builds a JBrowse URL using individual genomic parameters, with validation.
 * @param {Object} params - JBrowse parameters
 * @param {string} params.chromosome - Chromosome name
 * @param {number|string} params.start - Start position
 * @param {number|string} params.end - End position
 * @param {string} params.assemblyName - Reference genome name
 * @param {string[]} params.tracks - Array of track names
 * @param {string} [params.config="config.json"] - Config file name
 * @param {string} [params.baseUrl=env] - Base JBrowse URL (env default)
 * @returns {{ url: string|null, message: string|null }} - Final URL or validation error
 */
export function buildJBrowseUrlPositions({
  chromosome,
  start,
  end,
  assemblyName,
  tracks,
  config = "config.json",
  baseUrl = process.env.NEXT_PUBLIC_URI_JBROWSE,
}) {
  const validationError = validateFieldsJBrowser(VALID_SEARCH_JBR, {
    chromosome,
    start,
    end,
    assemblyName,
    tracks,
  });

  if (validationError) {
    return { url: null, message: validationError };
  }

  const loc = `${chromosome}:${start}..${end}`;
  const tracksParam = tracks.join(",");
  const qp = new URLSearchParams({
    config,
    loc,
    assembly: assemblyName,
    tracks: tracksParam,
  }).toString();

  return {
    url: `${baseUrl}?${qp}`,
    message: null,
  };
}
