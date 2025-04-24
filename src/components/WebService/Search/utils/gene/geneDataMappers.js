/**
 * Convierte un arreglo de registros de genes a resúmenes simples.
 * @param {Array<Object>} records - Respuesta de GraphQL con múltiples genes
 * @returns {Array<Object>} - Lista de resúmenes de genes
 */
export function mapGeneSummaries(records) {
  return (records || []).map((r) => ({
    geneId: r._id,
    accession: r.gene?.accessionId || "",
    name: r.gene?.name || "",
    start: r.gene?.startPosition || 0,
    end: r.gene?.endPosition || 0,
    chromosome: r.chromosome?.name || "",
    organismId: r.organism?._id || "",
    organism: r.organism?.name || "",
  }));
}

/**
 * Convierte un solo registro de gen a un objeto detallado.
 * @param {Object} r - Un registro de gen de GraphQL
 * @returns {Object} - Detalle completo del gen
 */
export function mapGeneDetail(r) {
  const record = r || {};
  return {
    geneId: record._id,
    accession: record.gene?.accessionId || "",
    name: record.gene?.name || "",
    start: record.gene?.startPosition || 0,
    end: record.gene?.endPosition || 0,
    strand: record.gene?.strand || "",
    sequence: record.gene?.sequence || "",
    description: record.gene?.description || "",
    chromosome: {
      id: record.chromosome?._id || "",
      name: record.chromosome?.name || "",
      type: record.chromosome?.type || "",
    },
    organism: {
      id: record.organism?._id || "",
      name: record.organism?.name || "",
    },
    transcripts: (record.transcripts || []).map((tx) => ({
      id: tx._id,
      accession: tx.accessionId || "",
      start: tx.startPosition || 0,
      end: tx.endPosition || 0,
      sequence: tx.sequence || "",
      aminoAcidSeq: tx.product?.aminoacidSequence || "",
      cdsSeq: tx.product?.sequence || "",
      utrs: (tx.utrs || []).map((u) => ({
        start: u.startPosition || 0,
        end: u.endPosition || 0,
        sequence: u.sequence || "",
        type: u.type || "",
      })),
      exons: (tx.exons || []).map((e) => ({
        start: e.startPosition || 0,
        end: e.endPosition || 0,
        sequence: e.sequence || "",
        type: e.type || "",
      })),
      cds: (tx.cds || []).map((c) => ({
        start: c.startPosition || 0,
        end: c.endPosition || 0,
        sequence: c.sequence || "",
        type: c.type || "",
      })),
    })),
  };
}
