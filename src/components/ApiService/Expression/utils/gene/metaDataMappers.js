//standard

// third party

//local

export function mapMetaDataExpression(result = {}) {
  return Object.entries(result).map(([library, { information }]) => ({
    library,
    organism: information?.organism || "",
    cultivar: information?.cultivar || "",
    genotype: information?.genotype || "",
    tissue_organ: information?.tissue_organ || "",
    treatment: information?.treatment || "",
    inocula: information?.inocula || "",
    time_post_treatment: information?.time_post_treatment || "",
    additional_info: information?.additional_info || "",
    reference: information?.reference || "",
    doi: information?.doi || "",
  }));
}
