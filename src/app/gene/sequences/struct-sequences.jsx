// standard
import { useState, useMemo } from "react";

// third party
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

// local
import { DisplayGenTrans, DisplayCDS } from "./utils/sequence-display";

// Legend colors for 5' UTRs, CDS, and 3' UTRs
const LEGEND_COLORS = {
  fiveUTR: { oneColor: "#AED2B3", twoColor: "#D7E9D9" },
  CDS: { oneColor: "#ACBADA", twoColor: "#D8DFEE" },
  threeUTR: { oneColor: "#CBA8C5", twoColor: "#E3D0E0" },
};

// Component that displays a legend item with a label and two color boxes
function LegendItem({ label, oneColor, twoColor }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="body2">{label}</Typography>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: 16, height: 16, backgroundColor: oneColor }} />
        <Box sx={{ width: 16, height: 16, backgroundColor: twoColor }} />
      </Box>
    </Box>
  );
}

// Component for displaying tab content (TabPanel)
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`sequence-tabpanel-${index}`}
      aria-labelledby={`sequence-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#D9D9D9",
            my: 1,
          }}
        >
          <Box sx={{ width: "95%", my: 2, background: "white" }}>
            {children}
          </Box>
        </Box>
      )}
    </div>
  );
}

export default function StructSequences({ geneData, selectedTranscript }) {
  // Responsive configuration for tabs
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // State for tabs
  const [tabValue, setTabValue] = useState("genomic");
  const handleTabChange = (event, newView) => {
    setTabValue(newView);
  };

  // Calculate sequence lengths
  const getSequenceLength = (sequence) => sequence?.length || "N/A";

  const genomicLength = getSequenceLength(geneData?.sequence);
  const transcriptLength = getSequenceLength(selectedTranscript?.sequence);
  const peptideLength = getSequenceLength(selectedTranscript?.aminoAcidSeq);
  // Calculate total CDS length
  const cdsLength = useMemo(() => {
    if (selectedTranscript?.cds?.length > 0) {
      return selectedTranscript.cds.reduce((total, cd) => {
        if (cd?.start && cd?.end) {
          const cdLength = cd.end - cd.start + 1;
          return total + cdLength;
        }
        return total;
      }, 0);
    }
    return "N/A";
  }, [selectedTranscript]);
  // ---

  // Build UTR and CDS annotations for the selected transcript
  const annotations = useMemo(() => {
    const ann = [];
    if (selectedTranscript) {
      if (selectedTranscript.utrs) {
        selectedTranscript.utrs.forEach((utr) => {
          ann.push({
            start: utr.start,
            end: utr.end,
            type: utr.type,
          });
        });
      }
      if (selectedTranscript.cds) {
        selectedTranscript.cds.forEach((cd) => {
          ann.push({
            start: cd.start,
            end: cd.end,
            type: cd.type,
          });
        });
      }
    }
    return ann;
  }, [selectedTranscript]);
  // ---

  // Function to generate FASTA file content with a given header and sequence, wrapping lines at lineWidth characters
  function generateFastaContent(header, sequence, lineWidth = 60) {
    let formattedSequence = "";
    for (let i = 0; i < sequence.length; i += lineWidth) {
      formattedSequence += sequence.substring(i, i + lineWidth) + "\n";
    }
    return `>${header}\n${formattedSequence}`;
  }

  // Function to handle sequence download based on the selected tab
  const handleDownload = () => {
    let header = "";
    let sequence = "";

    switch (tabValue) {
      case "genomic":
        if (!geneData?.sequence) {
          alert("No genomic sequence available.");
          return;
        }
        header = geneData.accession;
        sequence = geneData.sequence;
        break;
      case "transcript":
        if (!selectedTranscript?.sequence) {
          alert("No transcript sequence available.");
          return;
        }
        header = selectedTranscript.accession;
        sequence = selectedTranscript.sequence;
        break;
      case "cds":
        if (!selectedTranscript?.cds || selectedTranscript.cds.length === 0) {
          alert("No CDS available for this transcript.");
          return;
        }
        header = selectedTranscript.accession;
        // Si tienes una propiedad 'cdsSeq' que contenga la secuencia unida de CDS,
        // úsala; de lo contrario, podrías generar la secuencia a partir de las anotaciones.
        sequence = selectedTranscript.cdsSeq || "";
        if (!sequence) {
          alert("CDS sequence not available.");
          return;
        }
        break;
      case "peptide":
        if (!selectedTranscript?.aminoAcidSeq) {
          alert("No peptide sequence available.");
          return;
        }
        header = selectedTranscript.accession;
        sequence = selectedTranscript.aminoAcidSeq;
        break;
      default:
        return;
    }

    const fastaContent = generateFastaContent(header, sequence);
    const blob = new Blob([fastaContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${tabValue}_${header}_sequence.fa`;
    link.click();
    window.URL.revokeObjectURL(url);
  };
  // ---

  // Auxiliary functions for rendering each tab
  const renderGenomicTab = () => (
    <Box>
      <Box sx={{ p: 1 }}>
        <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
          {">"}
          {geneData.chromosome.name} | {geneData.accession} |{" "}
          {geneData.chromosome.type}: {geneData.start}..{geneData.end}{" "}
          {geneData.strand}
        </Typography>
      </Box>
      <DisplayGenTrans
        sequence={geneData.sequence}
        start={geneData.start}
        annotations={annotations}
      />
    </Box>
  );

  const renderTranscriptTab = () => {
    if (!selectedTranscript) {
      return (
        <Box sx={{ p: 1 }}>
          <Typography variant="body1">Transcript no available.</Typography>
        </Box>
      );
    }
    return (
      <Box>
        <Box sx={{ p: 1 }}>
          <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
            {">"}
            {geneData.chromosome.name} | {selectedTranscript.accession} :{" "}
            {selectedTranscript.start}..
            {selectedTranscript.end}
          </Typography>
        </Box>
        <DisplayGenTrans
          sequence={selectedTranscript.sequence}
          start={selectedTranscript.start}
          annotations={annotations}
        />
      </Box>
    );
  };

  const renderCDSTab = () => {
    if (
      !selectedTranscript ||
      !selectedTranscript.cds ||
      selectedTranscript.cds.length === 0
    ) {
      return (
        <Box sx={{ p: 1 }}>
          <Typography variant="body1">CDS no available.</Typography>
        </Box>
      );
    }
    return (
      <Box>
        <Box sx={{ p: 1 }}>
          <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
            {">"}
            {geneData.chromosome.name} | {selectedTranscript.accession} | CDS
          </Typography>
        </Box>
        <DisplayCDS
          sequence={selectedTranscript.sequence}
          start={selectedTranscript.start}
          annotations={annotations}
        />
      </Box>
    );
  };

  const renderPeptideTab = () => {
    if (
      !selectedTranscript ||
      !selectedTranscript.aminoAcidSeq ||
      selectedTranscript.aminoAcidSeq.length === 0
    ) {
      return (
        <Box sx={{ p: 1 }}>
          <Typography variant="body1">Peptide no available</Typography>
        </Box>
      );
    }
    return (
      <Box>
        <Box sx={{ p: 1 }}>
          <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
            {">"}
            {geneData.chromosome.name} | {selectedTranscript.accession} |
            Peptide
          </Typography>
        </Box>
        <Box sx={{ px: 1 }}>
          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}
          >
            {selectedTranscript.aminoAcidSeq}
          </Typography>
        </Box>
      </Box>
    );
  };

  // ---

  return (
    <Box
      sx={{
        width: "90%",
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 5,
        overflow: "hidden",
        py: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
            alignItems: "center",
            gap: { xs: 1, md: 0 },
          }}
        >
          <Box sx={{ textAlign: "left" }}>
            <Typography
              variant="h4"
              sx={{
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.4rem",
                  md: "1.8rem",
                  lg: "2.0rem",
                  xl: "2.4rem",
                },
                fontWeight: 500,
              }}
            >
              Sequences
            </Typography>
          </Box>

          {/* Columna 2: Leyenda (y botón para xs) */}
          <Box
            sx={{
              textAlign: { xs: "right", md: "center" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: { xs: "flex-end", md: "center" },
              }}
            >
              <LegendItem label="5'UTR" {...LEGEND_COLORS.fiveUTR} />
              <LegendItem label="CDS" {...LEGEND_COLORS.CDS} />
              <LegendItem label="3'UTR" {...LEGEND_COLORS.threeUTR} />
            </Box>
            {/* En xs, mostramos el botón debajo de la leyenda */}
            <Box
              sx={{
                display: { xs: "block", md: "none" },
                mt: { xs: 2, md: 0 },
              }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
              >
                DOWNLOAD
              </Button>
            </Box>
          </Box>

          {/* Columna 3: Botón (solo para md y superiores) */}
          <Box
            sx={{ textAlign: "right", display: { xs: "none", md: "block" } }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
            >
              DOWNLOAD
            </Button>
          </Box>
        </Box>
      </Box>

      {/* CONTENEDOR DE TABS */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 1,
        }}
      >
        <Box sx={{ width: "90%" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            orientation={isMdUp ? "horizontal" : "vertical"}
            aria-label="Sequence Tabs"
          >
            <Tab
              label={`Genomic [${genomicLength}]`}
              value="genomic"
              sx={{ maxWidth: "unset" }}
            />
            <Tab
              label={`Transcript [${transcriptLength}]`}
              value="transcript"
              sx={{ maxWidth: "unset" }}
            />
            <Tab
              label={`CDS [${cdsLength}]`}
              value="cds"
              sx={{ maxWidth: "unset" }}
            />
            <Tab
              label={`Peptide [${peptideLength}]`}
              value="peptide"
              sx={{ maxWidth: "unset" }}
            />
          </Tabs>

          {/* Paneles de cada pestaña */}
          <TabPanel value={tabValue} index="genomic">
            {renderGenomicTab()}
          </TabPanel>
          <TabPanel value={tabValue} index="transcript">
            {renderTranscriptTab()}
          </TabPanel>
          <TabPanel value={tabValue} index="cds">
            {renderCDSTab()}
          </TabPanel>
          <TabPanel value={tabValue} index="peptide">
            {renderPeptideTab()}
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
}
