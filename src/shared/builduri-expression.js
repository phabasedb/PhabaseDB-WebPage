// src/utils/builduri-expression.js

import { datasets } from "@/static/expression/datasets";

const validatedMessages = {
  incomplete: "Cannot display Expression because required data is missing.",
  noDataset:
    "Cannot display Expression because no dataset exists for this organism.",
};

/**
 * Attempts to construct the Gene Expression URL for a gene.
 * @param {Object} params
 * @param {string} params.accession   – El ID del gene (accession).
 * @param {string} params.organismId  – El _id del organismo en datasets.json.
 * @param {string} params.baseUrl     – URL base (ej. NEXT_PUBLIC_URI_EXPGENE).
 * @returns {{ response: string|null, message: string|null }}
 */
export function buildExpressionUrl({
  accession,
  organismId,
  baseUrl = process.env.NEXT_PUBLIC_URI_EXPGENE,
}) {
  // 1) Validar inputs
  if (!accession || !organismId) {
    return { url: null, message: validatedMessages.incomplete };
  }

  // 2) Buscar dataset en static/expression/datasets.json
  const datasetEntry = datasets.find((ds) => ds._id === organismId);
  if (!datasetEntry || !datasetEntry.matrix?.path) {
    return { url: null, message: validatedMessages.noDataset };
  }

  // 3) Construir la URL completa
  // Asegúrate de que `baseUrl` termine con "/" o añádelo aquí.
  const datasetPath = datasetEntry.matrix.path;
  const response = `${baseUrl}${datasetPath}/${accession}`;
  //const sep = baseUrl.endsWith("/") ? "" : "/";
  //const url = `${baseUrl}${sep}${datasetPath}/${accession}`;

  return { response, message: null };
}
