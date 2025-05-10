"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  ListSubheader,
} from "@mui/material";
import { datasets } from "@/static/blast/datasets";

export default function BlastPage() {
  const [sequence, setSequence] = useState("");
  const [program, setProgram] = useState("blastn");

  const [db, setDb] = useState("");
  const [result, setResult] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const URI =
    program === "blastn"
      ? process.env.NEXT_PUBLIC_URI_BLASTN
      : process.env.NEXT_PUBLIC_URI_BLASTP;

  const allDbs = datasets.flatMap((d) => [
    ...d.nucleotide.map((x) => ({ group: "Nucleotide", ...x })),
    ...d.protein.map((x) => ({ group: "Protein", ...x })),
  ]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch(URI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sequence, db }),
      });
      if (!res.ok) throw new Error(await res.text());
      setResult(await res.text());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box maxWidth="600px" mx="auto" py={4}>
      <Paper sx={{ p: 4 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          Ejecutar BLAST
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="program-label">Programa</InputLabel>
            <Select
              labelId="program-label"
              value={program}
              label="Programa"
              onChange={(e) => setProgram(e.target.value)}
            >
              <MenuItem value="blastn">BLASTN</MenuItem>
              <MenuItem value="blastp">BLASTP</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="db-label">Base de datos</InputLabel>
            <Select
              labelId="db-label"
              value={db}
              label="Base de datos"
              onChange={(e) => setDb(e.target.value)}
              renderValue={(val) =>
                allDbs.find((x) => x.path === val)?.name || ""
              }
            >
              <ListSubheader>Nucleotide</ListSubheader>
              {allDbs
                .filter((x) => x.group === "Nucleotide")
                .map((x) => (
                  <MenuItem key={x.path} value={x.path}>
                    {x.name}
                  </MenuItem>
                ))}
              <ListSubheader>Protein</ListSubheader>
              {allDbs
                .filter((x) => x.group === "Protein")
                .map((x) => (
                  <MenuItem key={x.path} value={x.path}>
                    {x.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <TextField
            label="Secuencia FASTA"
            multiline
            minRows={4}
            fullWidth
            margin="normal"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading || !db || !sequence}
          >
            {loading ? "Procesando…" : "Ejecutar"}
          </Button>
        </form>

        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
        {result && (
          <Box mt={3}>
            <Typography variant="subtitle2">Resultado (XML):</Typography>
            <Paper
              sx={{
                p: 2,
                maxHeight: 300,
                overflow: "auto",
                background: "#f5f5f5",
              }}
            >
              <pre style={{ fontSize: 12, whiteSpace: "pre-wrap" }}>
                {result}
              </pre>
            </Paper>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
