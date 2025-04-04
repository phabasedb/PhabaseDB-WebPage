export function formatGraphQLDataTable(graphQLResponse) {
  return graphQLResponse.map((item) => ({
    geneId: item?._id,
    geneIdOriginal: item?.gene?.accessionId || "",
    geneName: item?.gene?.name || "",
    chromosomeName: item?.chromosome?.name || "",
    organismName: item?.organism?.name || "",
  }));
}

export function formatGraphQLAccessionId(graphQLResponse) {
  return graphQLResponse.map((item) => ({
    geneId: item?._id,
    //Gene
    geneName: item?.gene?.name || "",
    geneIdOriginal: item?.gene?.accessionId || "",
    geneStart: item?.gene?.startPosition || 0,
    geneEnd: item?.gene?.endPosition || 0,
    geneStrand: item?.gene?.strand || "",
    geneSequence: item?.gene?.sequence || "",
    geneDescription: item?.gene?.description || "",
    //Chromosome
    chromosomeId: item?.chromosome?._id || "",
    chromosomeName: item?.chromosome?.name || "",
    chromosomeType: item?.chromosome?.type || "",
    //Organism
    organismName: item?.organism?.name || "",
    //Transcript
    transcripts: Array.isArray(item?.transcripts)
      ? item.transcripts.map((transcript) => ({
          transcriptId: transcript?._id || "",
          transcriptIdOriginal: transcript?.accessionId || "",
          transcriptStart: transcript?.startPosition || 0,
          transcriptEnd: transcript?.endPosition || 0,
          transcriptSequence: transcript?.sequence || "",
          //Product
          aminoacidSequence: transcript?.product?.aminoacidSequence || "",
          cdsCompleteSequence: transcript?.product?.sequence || "",
          //UTRs
          utrs: Array.isArray(transcript?.utrs)
            ? transcript.utrs.map((utr) => ({
                utrStart: utr?.startPosition || 0,
                utrEnd: utr?.endPosition || 0,
                utrSequence: utr?.sequence || "",
                utrType: utr?.type || "",
              }))
            : [],
          //Exons
          exons: Array.isArray(transcript?.exons)
            ? transcript.exons.map((exon) => ({
                exonStart: exon?.startPosition || 0,
                exonEnd: exon?.endPosition || 0,
                exonType: exon?.type || "",
                exonSequence: exon?.sequence || "",
              }))
            : [],
          // CDS
          cds: Array.isArray(transcript?.cds)
            ? transcript.cds.map((cd) => ({
                cdStart: cd?.startPosition || 0,
                cdEnd: cd?.endPosition || 0,
                cdType: cd?.type || "",
                cdSequence: cd?.sequence || "",
              }))
            : [],
        }))
      : [],
  }));
}
