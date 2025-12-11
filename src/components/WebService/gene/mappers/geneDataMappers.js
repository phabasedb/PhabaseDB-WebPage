/**
 * Simple gene summaries list
 */
export function mapGeneSummaries(records) {
  return records.map((r) => ({
    id: r._id,
    genAccessionId: r.gene?.accessionId,
    genName: r.gene?.name || "",
    chromosomeName: r.chromosome?.name || "",
    organismId: r.organism?._id,
    organismName: r.organism?.name || "",
  }));
}

/**
 * Detailed gene mapping
 */
export function mapGeneDetail(record) {
  return {
    id: record._id,

    gene: {
      accessionId: record.gene?.accessionId,
      name: record.gene?.name || "",
      start: record.gene?.startPosition || 0,
      end: record.gene?.endPosition || 0,
      strand: record.gene?.strand || "",
      sequence: record.gene?.sequence || "",
      length: record.gene?.length || 0,
      description: record.gene?.description || "",
    },

    chromosome: {
      id: record.chromosome?._id,
      name: record.chromosome?.name || "",
      type: record.chromosome?.type || "",
    },

    organism: {
      id: record.organism?._id,
      name: record.organism?.name || "",
    },

    transcripts: (record.transcripts || []).map((tx) => ({
      id: tx._id,
      accessionId: tx.accessionId,
      start: record.gene?.startPosition || 0,
      end: record.gene?.endPosition || 0,
      strand: tx.strand || "",
      sequence: tx.sequence || "",
      length: tx.length || 0,

      product: {
        sequence: tx.product?.sequence || "",
        length: tx.product?.length || 0,
        aminoacidSequence: tx.product?.aminoacidSequence || "",
      },

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
