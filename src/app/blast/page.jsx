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
} from "@mui/material";

export default function BlastPage() {
  const [sequence, setSequence] = useState("");
  const [db, setDb] = useState("");
  const [program, setProgram] = useState("blastn");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    // Puedes cambiar a /blastn o /blastp según tu routing. Si usas nginx debes enrutar esos endpoints.
    // Si Testing directo: usa "http://localhost:4001/blastn" temporalmente.
    const url =
      program === "blastn"
        ? "http://localhost:4001/blastn"
        : "http://localhost:4001/blastp";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sequence, db }),
      });

      if (!res.ok) {
        setError("No se pudo ejecutar el BLAST. " + (await res.text()));
        setLoading(false);
        return;
      }

      const text = await res.text();
      setResult(text);
    } catch (err) {
      setError("Error de red: " + err.message);
    }
    setLoading(false);
  }

  return (
    <Box maxWidth="sm" mx="auto" py={3}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
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
          <TextField
            label="Secuencia FASTA"
            multiline
            minRows={3}
            fullWidth
            margin="normal"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
          />
          <TextField
            label="Base BLAST (ruta ej: jamapa/Lotusjaponicus_Gifu_v1.2_genome)"
            fullWidth
            margin="normal"
            value={db}
            onChange={(e) => setDb(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Procesando..." : "Ejecutar"}
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
                maxHeight: 350,
                overflow: "auto",
                background: "#f5f5f5",
              }}
            >
              <pre
                style={{
                  fontSize: 12,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                }}
              >
                {result}
              </pre>
            </Paper>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
