"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  InputAdornment,
  IconButton,
  TextField,
  CircularProgress,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import datasets from "@/static/blast/datasets/index";
import { useBlast } from "./useBlast";

export default function BlastPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("nucleotide");
  const [selected, setSelected] = useState([]);
  const [evalue, setEvalue] = useState("");
  const [wordSize, setWordSize] = useState("");
  const [maxTargetSeqs, setMaxTargetSeqs] = useState("");
  const [filterQuery, setFilterQuery] = useState(true);
  const [allowGaps, setAllowGaps] = useState(true);
  const [matrix, setMatrix] = useState("BLOSUM62");
  const [iframeSrc, setIframeSrc] = useState("");

  useEffect(() => {
    const raw = sessionStorage.getItem("blastPrefill");
    if (raw) {
      try {
        const { accession, sequence } = JSON.parse(raw);
        const combined = `>${accession}\n${sequence}`;
        setQuery(combined);
      } catch {}
      sessionStorage.removeItem("blastPrefill");
    }
  }, []);

  const { handleBlast, loading, error, htmlResult } = useBlast({
    type,
    selected,
    query,
    evalue,
    wordSize,
    maxTargetSeqs,
    filterQuery,
    allowGaps,
    matrix,
  });

  useEffect(() => setSelected([]), [type]);

  useEffect(() => {
    if (!htmlResult) {
      setIframeSrc("");
      return;
    }
    const fullHtml = `<!DOCTYPE html>
    <html lang="en"> 
    <head>
      <meta charset="utf-8" />
      <base target="_self" />
    </head>
    <body>
      ${htmlResult}
    </body>
    </html>`;
    const blob = new Blob([fullHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setIframeSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [htmlResult]);

  const handleToggle = (path) => () => {
    setSelected((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        my: { xs: 3, md: 4 },
        gap: 3,
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

          <Box sx={{ my: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Sequence query:
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Paste query sequence(s) in FASTA format here…"
              multiline
              fullWidth
              minRows={8}
              maxRows={8}
              inputProps={{ style: { overflow: "auto", resize: "none" } }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                endAdornment: query && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="clear sequence"
                      onClick={() => setQuery("")}
                      edge="end"
                      size="small"
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

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

          <Box sx={{ my: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Advanced parameters:
            </Typography>
            <TextField
              label="Expect (E) threshold"
              variant="outlined"
              fullWidth
              sx={{ my: 1 }}
              value={evalue}
              onChange={(e) => setEvalue(e.target.value)}
            />
            <TextField
              label="Word (W) length"
              variant="outlined"
              fullWidth
              sx={{ my: 1 }}
              value={wordSize}
              onChange={(e) => setWordSize(e.target.value)}
            />
            <TextField
              label="# of alignments to show"
              variant="outlined"
              fullWidth
              sx={{ my: 1 }}
              value={maxTargetSeqs}
              onChange={(e) => setMaxTargetSeqs(e.target.value)}
            />
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={allowGaps}
                onChange={(e) => setAllowGaps(e.target.checked)}
              />
              <Typography>Allow gaps?</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={filterQuery}
                onChange={(e) => setFilterQuery(e.target.checked)}
              />
              <Typography>Filter query?</Typography>
            </Box>
          </Box>

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

      {error && (
        <Box sx={{ my: 2, color: "red" }}>
          <Typography>{error}</Typography>
        </Box>
      )}

      {iframeSrc && (
        <Box
          sx={{
            width: "90%",
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 5,
            height: "700px",
            overflow: "hidden",
          }}
        >
          <iframe
            title="blast-result"
            src={iframeSrc}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      )}
    </Box>
  );
}
