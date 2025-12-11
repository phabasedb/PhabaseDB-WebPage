// standard

// third party

// local
import { VALID_SEARCH_EXP } from "@/shared/const-validateds";
import { useApiRequest } from "./genericQuery";
import {
  mapGeneMatrixExpression,
  mapGenesIdsMatrixExpression,
  mapNotFoundIdsMatrixExpression,
} from "./utils/gene/geneMatrixDataMappers";
import { mapMetaDataExpression } from "./utils/gene/metaDataMappers";

// MATRIX FOR A GEN
export function useGeneMatrix(id, path) {
  return useApiRequest(
    () => ({
      url: `${process.env.NEXT_PUBLIC_URI_EXPGENE}/gene/${path}/${id}`,
      options: {},
    }),
    [id, path],
    [
      [id, VALID_SEARCH_EXP.id],
      [path, VALID_SEARCH_EXP.path],
    ],
    mapGeneMatrixExpression
  );
}

// MATRIX COLUMNS FOR IDS GEN/TRANSCRIPT AND COLUMNS
export function useGenesIdsMatrix(ids, columns, path) {
  return useApiRequest(
    () => ({
      url: `${process.env.NEXT_PUBLIC_URI_EXPGENE}/gene/ids`,
      options: {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataset: path, gene_ids: ids, columns }),
      },
    }),
    [ids, path, columns],
    [
      [ids, VALID_SEARCH_EXP.ids],
      [path, VALID_SEARCH_EXP.path],
      [columns, VALID_SEARCH_EXP.columns],
    ],
    mapGenesIdsMatrixExpression,
    mapNotFoundIdsMatrixExpression
  );
}

// METADATA COLUMNS
export function useMetaData(path) {
  return useApiRequest(
    () => ({
      url: `${process.env.NEXT_PUBLIC_URI_EXPGENE}/metadata/${path}`,
      options: {},
    }),
    [path],
    [[path, VALID_SEARCH_EXP.path]],
    mapMetaDataExpression
  );
}
