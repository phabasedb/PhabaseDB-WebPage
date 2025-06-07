"use client";
import { useState, useEffect } from "react";
import { useBlast } from "./hooks/useBlast";
import { parseXMLtoJSON } from "./utils/parseXml";
import { BlastForm } from "./components/BlastForm";
import { BlastResults } from "./components/BlastResults";
import { datasets } from "@/static/blast/datasets";

export default function BlastPage() {
  // estados
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [params, setParams] = useState({
    evalue: "",
    word_size: "",
    max_target_seqs: "",
    dust: "yes",
    seg: "yes",
    matrix: "BLOSUM62",
  });

  const uri = process.env.NEXT_PUBLIC_URI_BLASTN; // o BLASTP según tipo

  const { xml, loading, error, run } = useBlast({
    sequence: query,
    dbs: selected,
    params: Object.entries(params)
      .filter(([_, v]) => v !== "")
      .flatMap(([k, v]) => [k, v])
      .join(" "),
    uri,
  });

  const [xmlJson, setXmlJson] = useState({});

  useEffect(() => {
    if (!xml) return;
    setXmlJson(parseXMLtoJSON(xml));
  }, [xml]);

  const handleToggleDb = (path) =>
    setSelected((sel) =>
      sel.includes(path) ? sel.filter((s) => s !== path) : [...sel, path]
    );

  const handleParamsChange = (key, val) =>
    setParams((p) => ({ ...p, [key]: val }));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        margin: 24,
      }}
    >
      <BlastForm
        query={query}
        onQueryChange={setQuery}
        databases={datasets.flatMap((g) => g.nucleotide || g.protein)}
        selected={selected}
        onToggleDb={handleToggleDb}
        params={params}
        onParamsChange={handleParamsChange}
        loading={loading}
        onSubmit={run}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {xmlJson && <BlastResults xmlJson={xmlJson} />}
    </div>
  );
}
