// standard

// third party

// local

/**
 * Convierte datos de expresión a formato tabla con columnas dinámicas.
 * @param {Array<{geneId:string,transcriptId:string,condition:string,value:any}>} flatData
 * @param {{ includeGeneId?: boolean; includeTranscriptId?: boolean }} [opts]
 * @returns {{ columns: { name:string; label:string }[]; data: Record<string, any>[]; error?: string }}
 */
export function pivotableExpressionDataMui(
  flatData,
  { includeGeneId = true, includeTranscriptId = true } = {}
) {
  // Validación de flatData
  if (!flatData) {
    return {
      columns: [],
      data: [],
      error: "flatData no debe ser null ni undefined",
    };
  }

  if (!Array.isArray(flatData)) {
    return {
      columns: [],
      data: [],
      error: "flatData debe ser un arreglo",
    };
  }

  if (flatData.length === 0) {
    return {
      columns: [],
      data: [],
      error: "flatData está vacío",
    };
  }

  // Validación de opciones
  if (includeGeneId == null || typeof includeGeneId !== "boolean") {
    return {
      columns: [],
      data: [],
      error: "El parámetro includeGeneId debe ser booleano",
    };
  }

  if (includeTranscriptId == null || typeof includeTranscriptId !== "boolean") {
    return {
      columns: [],
      data: [],
      error: "El parámetro includeTranscriptId debe ser booleano",
    };
  }

  // Extraer condiciones únicas
  const conditions = Array.from(new Set(flatData.map((row) => row.condition)));

  // Columnas base
  const staticCols = [];
  if (includeGeneId) staticCols.push({ name: "geneId", label: "Gene ID" });
  if (includeTranscriptId)
    staticCols.push({ name: "transcriptId", label: "Transcript ID" });

  const conditionCols = conditions.map((cond) => ({
    name: cond,
    label: cond,
  }));

  const columns = [...staticCols, ...conditionCols];

  // Armar filas pivotadas
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

  const data = Object.values(map);

  return { columns, data };
}
