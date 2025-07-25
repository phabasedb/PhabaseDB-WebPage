export function mapGeneMatrixExpression(result) {
  const r = result || {};
  return {
    id: r.id,
    transcripts: (r.transcripts || []).map((tx) => ({
      id: tx.transcript_id,
      expression: (tx.expression || []).map((ex) => ({
        condition: ex.condition,
        value: ex.value,
      })),
    })),
  };
}

export function mapGenesIdsMatrixExpression(result) {
  return (result || []).map((geneObj) => ({
    id: geneObj.id,
    transcripts: (geneObj.transcripts || []).map((tx) => ({
      id: tx.transcript_id,
      expression: (tx.expression || []).map((ex) => ({
        condition: ex.condition,
        value: ex.value,
      })),
    })),
  }));
}

export function mapNotFoundIdsMatrixExpression(notFound) {
  return {
    genes: Array.isArray(notFound.genes) ? notFound.genes : [],
    transcripts: Array.isArray(notFound.transcripts)
      ? notFound.transcripts
      : [],
  };
}
