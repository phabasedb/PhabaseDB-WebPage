import { datasets } from "@/static/datasets";

/**
 * Construye la URL de JBrowse a partir de datos de gen.
 *
 * @param {Object} params
 * @param {string} params.organismId   — dataset._id
 * @param {string} params.chromosome   — nombre de cromosoma
 * @param {number} params.start        — posición inicio
 * @param {number} params.end          — posición fin
 * @param {string} [params.config="config.json"]
 * @param {string} [baseUrl=process.env.NEXT_PUBLIC_BASE_URL]
 * @param {string|number} [port=process.env.NEXT_PUBLIC_JBROWSE_PORT]
 * @returns {string|null} URL completa o null si faltan datos o rango inválido
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
  // Validar datos obligatorios
  if (!organismId || !chromosome || start == null || end == null) {
    return null;
  }

  // Validar que start y end sean números enteros y rango correcto
  const startNum = Number(start);
  const endNum = Number(end);
  if (
    !Number.isInteger(startNum) ||
    !Number.isInteger(endNum) ||
    startNum < 0 ||
    endNum < 0 ||
    startNum > endNum
  ) {
    return null;
  }

  // Buscar el dataset correspondiente
  const ds = datasets.find((d) => d._id === organismId);
  if (!ds) {
    return null;
  }

  // Construir parámetros de loc y tracks
  const loc = `${chromosome}:${startNum}..${endNum}`;
  const tracks = Array.isArray(ds.tracks) ? ds.tracks.join(",") : "";
  const qp = new URLSearchParams({
    config,
    loc,
    assembly: ds.assamblyName,
    tracks,
  }).toString();

  return `${baseUrl}:${port}/?${qp}`;
}
