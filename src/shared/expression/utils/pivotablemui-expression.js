// standard

// third party

// local

/**
 * Converts expression data into a pivoted table format with dynamic columns.
 * @param {Array<{geneId:string,transcriptId:string,condition:string,value:any}>} flatData
 * @param {{ includeGeneId?: boolean; includeTranscriptId?: boolean }} [opts]
 * @returns {{ columns: { name:string; label:string }[]; data: Record<string, any>[]; error?: string }}
 */
export function pivotableExpressionDataMui(
  flatData,
  { includeGeneId = true, includeTranscriptId = true } = {}
) {
  // Ensure flatData is a valid array
  if (!Array.isArray(flatData)) {
    return {
      columns: [],
      data: [],
      error:
        "An error occurred while processing data in table format, a valid data type is required.",
    };
  }

  // Ensure array is not empty
  if (flatData.length === 0) {
    return {
      columns: [],
      data: [],
      error:
        "An error occurred while processing data in table format, must have mandatory data for gene expression display.",
    };
  }

  // Validate includeGeneId option
  if (includeGeneId == null || typeof includeGeneId !== "boolean") {
    return {
      columns: [],
      data: [],
      error:
        "An error occurred in parameter input: Parameter includeGeneId must be boolean",
    };
  }

  // Validate includeTranscriptId option
  if (includeTranscriptId == null || typeof includeTranscriptId !== "boolean") {
    return {
      columns: [],
      data: [],
      error:
        "An error occurred in parameter input: Parameter includeTranscriptId must be boolean.",
    };
  }

  // Get all unique conditions
  const conditions = Array.from(new Set(flatData.map((row) => row.condition)));

  // Define base columns
  const staticCols = [];
  if (includeGeneId) staticCols.push({ name: "geneId", label: "Gene ID" });
  if (includeTranscriptId)
    staticCols.push({ name: "transcriptId", label: "Transcript ID" });

  // Add one column per condition
  const conditionCols = conditions.map((cond) => ({
    name: cond,
    label: cond,
  }));

  const columns = [...staticCols, ...conditionCols];

  // Build pivoted rows
  const map = {};
  flatData.forEach(({ geneId, transcriptId, condition, value }) => {
    const key = `${geneId}||${transcriptId}`;
    if (!map[key]) {
      map[key] = {};
      if (includeGeneId) map[key].geneId = geneId;
      if (includeTranscriptId) map[key].transcriptId = transcriptId;
    }
    map[key][condition] = value;
  });

  // Convert map to array
  const data = Object.values(map);

  return { columns, data };
}
