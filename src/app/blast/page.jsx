"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  TextField,
  CircularProgress,
} from "@mui/material";
import datasets from "@/static/blast/datasets/datasets.json";

export default function BlastPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("nucleotide");
  const [selected, setSelected] = useState([]);
  const [htmlResult, setHtmlResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => setSelected([]), [type]);

  //Parameters
  const [evalue, setEvalue] = useState("-1");
  const [wordSize, setWordSize] = useState("");
  const [maxTargetSeqs, setMaxTargetSeqs] = useState("100");
  const [filterQuery, setFilterQuery] = useState(true);
  const [allowGaps, setAllowGaps] = useState(true);
  // Only a protein (BLASTP):
  const [matrix, setMatrix] = useState("BLOSUM62");

  const handleToggle = (path) => () => {
    setSelected((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  const handleBlast = async () => {
    setLoading(true);
    setError(null);
    setHtmlResult("");

    // 1) Monta un array con todos los flags
    const args = [];

    // E‑value
    if (evalue && evalue !== "") {
      args.push("-evalue", evalue);
    }

    // Word size
    if (wordSize && wordSize !== "") {
      args.push("-word_size", wordSize);
    }

    // Máximo de secuencias
    if (maxTargetSeqs && maxTargetSeqs !== "") {
      args.push("-max_target_seqs", maxTargetSeqs);
    }

    // Gaps
    if (!allowGaps) {
      args.push("-ungapped");
    }

    // Filtro de baja complejidad
    if (type === "nucleotide") {
      args.push("-dust", filterQuery ? "yes" : "no");
    } else {
      args.push("-seg", filterQuery ? "yes" : "no");
    }

    // Matriz (solo para BLASTP)
    if (type === "protein" && matrix) {
      args.push("-matrix", matrix);
    }

    const advancedParams = args.join(" ");

    // 2) Llama a la API con esa cadena
    const uri =
      type === "nucleotide"
        ? process.env.NEXT_PUBLIC_URI_BLASTN
        : process.env.NEXT_PUBLIC_URI_BLASTP;

    try {
      const res = await fetch(uri, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sequence: query,
          db: selected,
          params: advancedParams,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error en BLAST");
      }
      const html = await res.text();
      setHtmlResult(html);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        my: { xs: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          width: "90%",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: 5,
        }}
      >
        {/* Title */}
        <Box sx={{ width: "90%", my: 1 }}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: "1.3rem",
                sm: "1.5rem",
                md: "1.7rem",
                lg: "1.9rem",
                xl: "2.1rem",
              },
            }}
          >
            BLAST
          </Typography>

          {/* Sequence */}
          <Box sx={{ my: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Sequence query:
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Paste query sequence(s) in FASTA format here…"
              multiline
              fullWidth
              minRows={5}
              maxRows={5}
              inputProps={{ style: { overflow: "auto", resize: "none" } }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Box>

          {/* Type: Button NUCLEOTIDE or PROTEIN */}
          <Box sx={{ my: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Database selection:
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant={type === "nucleotide" ? "contained" : "outlined"}
                onClick={() => setType("nucleotide")}
                sx={{ flex: 1 }}
              >
                NUCLEOTIDE
              </Button>
              <Button
                variant={type === "protein" ? "contained" : "outlined"}
                onClick={() => setType("protein")}
                sx={{ flex: 1 }}
              >
                PROTEIN
              </Button>
            </Box>
          </Box>

          {/* Dataset List */}
          {datasets.map((dbGroup, i) => {
            const items = dbGroup[type] || [];
            return (
              <Box key={dbGroup.database}>
                <Typography variant="subtitle1" fontWeight={500}>
                  {dbGroup.database}
                </Typography>
                {items.length > 0 ? (
                  <List dense>
                    {items.map((ds) => {
                      const isChecked = selected.includes(ds.path);
                      return (
                        <ListItem key={ds.path} disablePadding>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              onChange={handleToggle(ds.path)}
                              checked={isChecked}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={ds.name}
                            sx={{ fontStyle: "italic" }}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                ) : (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontStyle: "italic", py: 1 }}
                  >
                    No {type} datasets are available.
                  </Typography>
                )}
                {i < datasets.length - 1 && <Divider sx={{ mb: 1 }} />}
              </Box>
            );
          })}

          {/* Advanced Params */}
          <Box sx={{ my: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Advanced parameters:
            </Typography>

            {/* E-value */}
            <TextField
              label="Expect (E) threshold"
              variant="outlined"
              fullWidth
              sx={{ my: 1 }}
              value={evalue}
              onChange={(e) => setEvalue(e.target.value)}
            />

            {/* Word size */}
            <TextField
              label="Word (W) length"
              variant="outlined"
              fullWidth
              sx={{ my: 1 }}
              placeholder="default"
              value={wordSize}
              onChange={(e) => setWordSize(e.target.value)}
            />

            {/* Max Target Seqs */}
            <TextField
              label="# of alignments to show"
              variant="outlined"
              fullWidth
              sx={{ my: 1 }}
              value={maxTargetSeqs}
              onChange={(e) => setMaxTargetSeqs(e.target.value)}
            />

            {/* Protein-only: Comparison Matrix */}
            {type === "protein" && (
              <TextField
                select
                label="Comparison matrix"
                variant="outlined"
                fullWidth
                sx={{ my: 1 }}
                value={matrix}
                SelectProps={{ native: true }}
                onChange={(e) => setMatrix(e.target.value)}
              >
                <option value="BLOSUM62">BLOSUM62</option>
                <option value="BLOSUM45">BLOSUM45</option>
                <option value="PAM30">PAM30</option>
                <option value="PAM70">PAM70</option>
              </TextField>
            )}

            {/* Allow Gaps */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={allowGaps}
                onChange={(e) => setAllowGaps(e.target.checked)}
              />
              <Typography>Allow gaps?</Typography>
            </Box>

            {/* Filter Query */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={filterQuery}
                onChange={(e) => setFilterQuery(e.target.checked)}
              />
              <Typography>Filter query?</Typography>
            </Box>
          </Box>

          {/* Action Button */}
          <Box sx={{ textAlign: "center", my: 2 }}>
            <Button
              variant="contained"
              disabled={selected.length === 0 || !query || loading}
              onClick={handleBlast}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : type === "nucleotide" ? (
                "BLASTN"
              ) : (
                "BLASTP"
              )}
            </Button>
          </Box>
        </Box>
      </Box>
      {/* Error Message */}
      {error && (
        <Box sx={{ mt: 2, color: "red" }}>
          <Typography>{error}</Typography>
        </Box>
      )}
      {/* Results Display */}
      {htmlResult && (
        <Box sx={{ mt: 2, width: "90%" }}>
          <Typography variant="h6" gutterBottom>
            BLAST Results
          </Typography>
          <Paper sx={{ p: 2, maxHeight: 600, overflow: "auto" }}>
            <div dangerouslySetInnerHTML={{ __html: htmlResult }} />
          </Paper>
        </Box>
      )}
    </Box>
  );
}
