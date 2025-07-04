// standard

// third party

// local

/**
 * Applies expression data from one or more genes.
 * Returns one object: { data, error }
 */
export function flattenExpressionData(data) {
  const isArray = Array.isArray(data);
  const isObject = typeof data === "object" && data !== null;

  if (!isArray && !isObject) {
    return {
      data: [],
      error:
        "An error has occurred in the flattening process, a valid data type is required.",
    };
  }

  if (isArray && data.length === 0) {
    return {
      data: [],
      error: "It cannot be flattened: the gene array is empty.",
    };
  }

  if (isObject && Object.keys(data).length === 0) {
    return {
      data: [],
      error: "It cannot be flattened: the expression object is empty.",
    };
  }

  if (!isArray) {
    const geneId = data.id;
    const flattened = data.transcripts.flatMap((tx) =>
      tx.expression.map((ex) => ({
        geneId,
        transcriptId: tx.id,
        condition: ex.condition,
        value: ex.value,
      }))
    );
    return { data: flattened, error: null };
  }

  const flattened = data.flatMap((gene) =>
    gene.transcripts.flatMap((tx) =>
      tx.expression.map((ex) => ({
        geneId: gene.id,
        transcriptId: tx.id,
        condition: ex.condition,
        value: ex.value,
      }))
    )
  );

  return { data: flattened, error: null };
}
