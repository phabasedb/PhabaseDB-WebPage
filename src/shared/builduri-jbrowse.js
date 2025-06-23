//standard

// third party

//local

/**
 * Constructs the JBrowse URL from a sessionDefect.
 * @param {Object} sessionDefect – el objeto sessionDefect de tu dataset
 * @param {string} [baseUrl] – por defecto NEXT_PUBLIC_BASE_URL
 * @param {string} [port] – por defecto NEXT_PUBLIC_JBROWSE_PORT
 * @returns {string|null} Full URL o null si no hay sessionDefect
 */
export function buildJBrowseUrlDefectSession({
  sessionDefect,
  baseUrl = process.env.NEXT_PUBLIC_URI_JBROWSE,
}) {
  if (!sessionDefect) return null;

  const json = JSON.stringify(sessionDefect);
  //    ?config=config.json&session=spec-{"views":[…]}
  return `${baseUrl}?config=config.json&session=spec-${json}`;
}

// Validation messages for the buildJBrowseUrlPositions function
const validatedMessages = {
  incomplete:
    "Unable to display the genome browser due to missing required data.",
  badRange:
    "Unable to display the genome browser due to an invalid position range.",
  noAssembly:
    "Unable to display the genome browser because the reference genome is not available.",
  noTracks:
    "Unable to display the genome browser because no genomic data is available to visualize.",
};

/**
 * Builds a JBrowse URL based solely on the provided values.
 *
 * @param {Object} params
 * @param {string} params.chromosome     - Chromosome name
 * @param {number|string} params.start   - Start position
 * @param {number|string} params.end     - End position
 * @param {string} params.assemblyName   - Name of the assembly
 * @param {string[]} params.tracks       - List of track names
 * @param {string} [params.config]       - Configuration file (default: "config.json")
 * @param {string} [params.baseUrl]      - Base JBrowse URL (env: NEXT_PUBLIC_URI_JBROWSE)
 *
 * @returns {{ url: string|null, message: string|null }}
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
  // Check for required parameters
  if (!chromosome || start == null || end == null) {
    return { url: null, message: validatedMessages.incomplete };
  }

  // Validate numeric range
  const s = Number(start);
  const e = Number(end);
  if (!Number.isInteger(s) || !Number.isInteger(e) || s < 0 || e < 0 || s > e) {
    return { url: null, message: validatedMessages.badRange };
  }

  // Check for required assembly name
  if (!assemblyName) {
    return { url: null, message: validatedMessages.noAssembly };
  }

  // Check for valid tracks
  if (!Array.isArray(tracks) || tracks.length === 0) {
    return { url: null, message: validatedMessages.noTracks };
  }

  // Build the final JBrowse URL
  const loc = `${chromosome}:${s}..${e}`;
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
