"use client";

//standard
import { useState } from "react";

//third party
import {
  Box,
  Typography,
  TextField,
  Chip,
  Autocomplete,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";

//local
import { datasets } from "@/static/expression/datasets";
import { MetadataSection } from "./metadata-section";
import { MatrixSection } from "./matrix-section";
import useBreakpointWidthExpChart from "@/shared/expression/utils/breakpoints-widthChart";
import useContainerWidth from "@/shared/expression/utils/container-width";

export default function GeneExpressionPage() {
  // Selection states and values
  const [tags, setTags] = useState([]);
  const [selectedDs, setSelectedDs] = useState(null);
  const [selectedCols, setSelectedCols] = useState([]);

  // States of charge
  const [loadedMeta, setLoadedMeta] = useState(false);
  const [triggerMatrix, setTriggerMatrix] = useState(false);

  // States to capture values on click (“fixed” values for MatrixSection)
  const [matrixIds, setMatrixIds] = useState([]);
  const [matrixColumns, setMatrixColumns] = useState([]);
  const [matrixDs, setMatrixDs] = useState(null);

  // Filter datasets to include only those with an id, database name, and valid matrix & metadata paths
  const validDatasets = datasets.filter(
    ({ id, database, matrix, metadata }) =>
      id && database && matrix?.path && metadata?.path
  );

  const {
    ref: containerRefMeta,
    width: containerWidthMeta,
    measure: containerMeasureMeta,
  } = useContainerWidth();

  const {
    ref: containerRefMatrix,
    width: containerWidthMatrx,
    measure: containerMeasureMatrix,
  } = useContainerWidth();

  const fallbackWidth = useBreakpointWidthExpChart();

  const sequenceHolder = [
    "Paste IDs here. Examples: ID Gene:PvNJ1.1_chr11_0419600 or ID Transcript:PvNJ1.1_chr11_0419600.t1 ...",
  ];

  //Calculation of box width for metadata table
  const chartWidthMeta =
    containerWidthMeta > 0 ? containerWidthMeta : fallbackWidth;
  //Calculation of the width of the box for the matrix table
  const chartWidthMatrix =
    containerWidthMatrx > 0 ? containerWidthMatrx : fallbackWidth;

  // Function to handle "Load
  const handleLoad = () => {
    if (selectedDs) {
      setLoadedMeta(true);
    }
  };

  // Function to handle "Clear
  const handleClear = () => {
    setLoadedMeta(false);
    setSelectedCols([]);
    setTriggerMatrix(false);
    setMatrixIds([]);
    setMatrixColumns([]);
    setMatrixDs(null);
  };

  // Function to handle "Gene Expression
  const handleGeneExpression = () => {
    setMatrixIds(tags);
    setMatrixColumns(selectedCols);
    setMatrixDs(selectedDs);
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
        <Box ref={containerRefMeta} sx={{ width: "90%", my: 1 }}>
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

          {/** Input IDs Gene/Transcript */}
          <Box sx={{ my: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              IDs Gene/Transcript:
            </Typography>
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={tags}
              onChange={(event, newValue) => setTags(newValue)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...props } = getTagProps({ index });
                  return <Chip key={key} label={option} {...props} />;
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder={tags.length === 0 ? sequenceHolder : "Add ID"}
                />
              )}
            />
          </Box>

          {/** Dataset selection con Load y Clear */}
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
                  value={selectedDs?.id || ""}
                  label="Select dataset"
                  onChange={(e) =>
                    setSelectedDs(
                      validDatasets.find((d) => d.id === e.target.value)
                    )
                  }
                  disabled={loadedMeta}
                >
                  {validDatasets.map((ds) => (
                    <MenuItem key={ds.id} value={ds.id}>
                      {ds.database}
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
                  disabled={!selectedDs || loadedMeta}
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

          {/* MetadataSection is mounted only when loaded */}
          {loadedMeta && selectedDs && (
            <Box sx={{ my: 2, width: chartWidthMeta }}>
              <MetadataSection
                selected={selectedDs}
                onSelectCols={setSelectedCols}
              />
            </Box>
          )}

          {/* Final action, result of MatrixSection*/}
          <Box sx={{ textAlign: "center", my: 2 }}>
            <Button
              variant="contained"
              onClick={handleGeneExpression}
              disabled={!loadedMeta || !tags.length || !selectedCols.length}
            >
              Gene Expression
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Matrix section */}
      {triggerMatrix && matrixDs && (
        <Box
          ref={containerRefMatrix}
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
            matrixPath={matrixDs.matrix.path}
            chartWidth={chartWidthMatrix}
            measure={containerMeasureMatrix}
          />
        </Box>
      )}
    </Box>
  );
}
