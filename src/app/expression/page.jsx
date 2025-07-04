"use client";

// standard

// third party
import { Box, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";

// local
import { useMetaData } from "@/components/ApiService/Expression";
import { useGenesIdsMatrix } from "@/components/ApiService/Expression";

export default function GeneExpressionPage() {
  //const datasetPath = "pvulgarisnj/GEA_NJ_meta_data.csv";
  //const { data, loading, error } = useMetaData(datasetPath);

  const dataset = "pvulgarisnj/GEA_NJ_matrix_data.csv";
  const gene_ids = ["PvNJ1.1_chr10_0251000", "GENE_B.t1", "GENE_C"];
  const columns = ["Leaf_Young_NO3-"];

  const { data, not_found, loading, error } = useGenesIdsMatrix(
    gene_ids,
    dataset,
    columns
  );

  /*const columnsName = [
    { name: "column", label: "Column" },
    { name: "organism", label: "Organism" },
    { name: "cultivar", label: "Cultivar" },
    { name: "genotype", label: "Genotype" },
    { name: "tissue_organ", label: "Tissue/Organ" },
    { name: "treatment", label: "Treatment" },
    { name: "inocula", label: "Inocula" },
    { name: "time_post_treatment", label: "Time post-treatment/inoculation" },
    { name: "additional_info", label: "Additional information" },
    { name: "reference", label: "Reference" },
  ];

  if (loading) return <div>Cargando metadata…</div>;
  if (error) return <div>Error: {error}</div>;*/

  return <Box>{/*<MUIDataTable data={data} columns={columnsName} /> */}</Box>;
}
