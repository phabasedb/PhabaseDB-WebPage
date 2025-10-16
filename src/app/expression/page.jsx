"use client";

//standard
import { useState } from "react";

//third party
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

//local
import { datasets } from "@/static/expression/datasets";
import { MetadataSection } from "./metadata-section";
import { MatrixSection } from "./matrix-section";
import useBreakpointWidthExpChart from "@/shared/expression/utils/breakpoints-widthChart";
import useContainerWidth from "@/shared/expression/utils/container-width";

export default function GeneExpressionPage() {
  // Estados principales
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCols, setSelectedCols] = useState([]);
  const [idsText, setIdsText] = useState("");
  const [graphType, setGraphType] = useState("raw");

  // Estados de carga
  const [loadedMeta, setLoadedMeta] = useState(false);
  const [triggerMatrix, setTriggerMatrix] = useState(false);

  // Valores fijos para MatrixSection
  const [matrixIds, setMatrixIds] = useState([]);
  const [matrixColumns, setMatrixColumns] = useState([]);
  const [matrixPath, setMatrixPath] = useState("");

  // Extraer datasets válidos (nueva estructura con types)
  const validTypes = [];
  datasets.forEach((d) => {
    Object.entries(d.types).forEach(([key, typeData]) => {
      validTypes.push({
        parentId: d.id,
        parentDatabase: d.database,
        key,
        ...typeData, // title, metadata, matrices
      });
    });
  });

  // Tamaños dinámicos
  const { ref: refMeta, width: wMeta, measure: mMeta } = useContainerWidth();
  const {
    ref: refMatrix,
    width: wMatrix,
    measure: mMatrix,
  } = useContainerWidth();
  const fallbackWidth = useBreakpointWidthExpChart();
  const chartWidthMeta = wMeta > 0 ? wMeta : fallbackWidth;
  const chartWidthMatrix = wMatrix > 0 ? wMatrix : fallbackWidth;

  // --- Funciones ---
  const handleSelectChange = (e) => {
    const value = e.target.value;
    const found = validTypes.find((d) => d.title === value);
    setSelectedType(found);
  };

  const handleLoad = () => {
    if (selectedType) setLoadedMeta(true);
  };

  // Function to handle "Clear
  const handleClear = () => {
    setLoadedMeta(false);
    setSelectedType(null);
    setSelectedCols([]);
    setIdsText("");
    setTriggerMatrix(false);
    setMatrixIds([]);
    setMatrixColumns([]);
    setMatrixPath("");
  };

  // Function to handle "Gene Expression
  const handleGeneExpression = () => {
    const idsList = idsText
      .split(/\s+/)
      .map((id) => id.trim())
      .filter((id) => id !== "");

    setMatrixIds(idsList);
    setMatrixColumns(selectedCols);

    const path =
      graphType === "raw"
        ? selectedType.matrices.raw.path
        : selectedType.matrices.scorez.path;

    setMatrixPath(path);
    setTriggerMatrix(true);
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
        <Box ref={refMeta} sx={{ width: "90%", my: 1 }}>
          {/** Title */}
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
            Gene Expression
          </Typography>

          {/* 1️⃣ Dataset selection */}
          <Box sx={{ my: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Dataset selection:
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 1, md: 2 },
                alignItems: "center",
              }}
            >
              {/* Dataset dropdown */}
              <FormControl sx={{ flex: 1, width: { xs: "100%", md: "auto" } }}>
                <InputLabel>Select dataset</InputLabel>
                <Select
                  value={selectedType?.title || ""}
                  label="Select dataset"
                  onChange={handleSelectChange}
                  disabled={loadedMeta}
                >
                  {validTypes.map((ds) => (
                    <MenuItem key={ds.title} value={ds.title}>
                      {ds.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Load and Clear buttons */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: { xs: "100%", md: "auto" },
                  gap: { xs: 1, md: 2 },
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleLoad}
                  disabled={!selectedType || loadedMeta}
                  sx={{ flex: { xs: 1, md: "none" } }}
                >
                  Load
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleClear}
                  disabled={!loadedMeta}
                  sx={{ flex: { xs: 1, md: "none" } }}
                >
                  Clear
                </Button>
              </Box>
            </Box>
          </Box>

          {/* 2️⃣ MetadataSection */}
          {loadedMeta && selectedType && (
            <Box sx={{ my: 2, width: chartWidthMeta }}>
              <MetadataSection
                selected={selectedType}
                onSelectCols={setSelectedCols}
              />
            </Box>
          )}

          {/* 3️⃣ IDs Gene/Transcript */}
          {loadedMeta && (
            <Box sx={{ my: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                IDs Gene/Transcript:
              </Typography>
              <TextField
                multiline
                fullWidth
                rows={3}
                placeholder="Paste IDs separated by spaces..."
                value={idsText}
                onChange={(e) => setIdsText(e.target.value)}
              />
            </Box>
          )}

          {/* 4️⃣ Tipo de gráfica */}
          {loadedMeta && (
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Data transform:
              </Typography>
              <FormControl>
                <RadioGroup
                  row
                  value={graphType}
                  onChange={(e) => setGraphType(e.target.value)}
                >
                  <FormControlLabel
                    value="raw"
                    control={<Radio />}
                    label="Normalized"
                  />
                  <FormControlLabel
                    value="scorez"
                    control={<Radio />}
                    label="Z-Score"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          )}

          {/* 5️⃣ Botón para graficar */}
          <Box sx={{ textAlign: "center", my: 2 }}>
            <Button
              variant="contained"
              onClick={handleGeneExpression}
              disabled={!loadedMeta || !idsText.trim() || !selectedCols.length}
            >
              Gene Expression
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Matrix section */}
      {triggerMatrix && (
        <Box
          ref={refMatrix}
          sx={{
            width: "90%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
            borderRadius: 2,
            boxShadow: 5,
            pt: 2,
            pb: 1,
          }}
        >
          <MatrixSection
            ids={matrixIds}
            columns={matrixColumns}
            matrixPath={matrixPath}
            graphType={graphType}
            chartWidth={chartWidthMatrix}
            measure={mMatrix}
          />
        </Box>
      )}
    </Box>
  );
}
