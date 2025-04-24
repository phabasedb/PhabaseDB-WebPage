import { datasets } from "@/static/datasets";

const validatedMessages = {
  incomplete: "Cannot display JBrowse because required data is missing.",
  badRange: "Cannot display JBrowse because the position range is invalid.",
  noDataset:
    "Cannot display JBrowse because no dataset exists for this organism.",
};

/**
 * Attempts to construct the JBrowse URL for a gen.
 * @param {Object} params
 * @returns {{ url: string|null, message: string|null }}
 */
export function buildJBrowseUrl({
  organismId,
  chromosome,
  start,
  end,
  config = "config.json",
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL,
  port = process.env.NEXT_PUBLIC_JBROWSE_PORT,
}) {
  if (!organismId || !chromosome || start == null || end == null) {
    return { url: null, message: validatedMessages.incomplete };
  }

  const s = Number(start),
    e = Number(end);
  if (!Number.isInteger(s) || !Number.isInteger(e) || s < 0 || e < 0 || s > e) {
    return { url: null, message: validatedMessages.badRange };
  }

  const ds = datasets.find((d) => d._id === organismId);
  if (!ds) {
    return { url: null, message: validatedMessages.noDataset };
  }

  const loc = `${chromosome}:${s}..${e}`;
  const tracks = Array.isArray(ds.tracks) ? ds.tracks.join(",") : "";
  const qp = new URLSearchParams({
    config,
    loc,
    assembly: ds.assamblyName,
    tracks,
  }).toString();
  const url = `${baseUrl}:${port}/?${qp}`;

  return { url, message: null };
}

/**
 * Constructs the JBrowse URL from a sessionDefect.
 * @param {Object} sessionDefect – el objeto sessionDefect de tu dataset
 * @param {string} [baseUrl] – por defecto NEXT_PUBLIC_BASE_URL
 * @param {string} [port] – por defecto NEXT_PUBLIC_JBROWSE_PORT
 * @returns {string|null} Full URL o null si no hay sessionDefect
 */
export function buildJBrowseUrlFromSession({
  sessionDefect,
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL,
  port = process.env.NEXT_PUBLIC_JBROWSE_PORT,
}) {
  if (!sessionDefect) return null;

  const json = JSON.stringify(sessionDefect);
  //    ?config=config.json&session=spec-{"views":[…]}
  return `${baseUrl}:${port}/?config=config.json&session=spec-${json}`;
}
