// standard

// third party
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";

// local

export default function StructInfo({
  gene,
  organism,
  chromosome,
  transcripts,
  selectedTranscript,
  setSelectedTranscript,
  onNavClick,
}) {
  const router = useRouter();

  const commonTypographyStyle = {
    fontSize: {
      xs: "0.9rem",
      sm: "1.1rem",
      md: "1.4rem",
      lg: "1.7rem",
      xl: "1.9rem",
    },
    textTransform: "none",
  };

  const InfoItem = ({ label, value }) => (
    <Typography sx={commonTypographyStyle} component="div">
      <Box component="span" sx={{ fontWeight: "bold" }}>
        {label}:{" "}
      </Box>
      {value}
    </Typography>
  );

  const TranscriptsSection = ({ transcripts, selected, onChange }) => (
    <Box>
      <Typography sx={commonTypographyStyle} component="div">
        <Box component="span" sx={{ fontWeight: "bold" }}>
          Transcripts:
        </Box>
      </Typography>
      {transcripts && transcripts.length > 0 ? (
        <ToggleButtonGroup
          orientation="vertical"
          exclusive
          value={selected?.id || ""}
          onChange={(e, newId) => {
            if (newId) onChange(transcripts.find((t) => t.id === newId));
          }}
          color="primary"
          sx={{
            display: "flex",
          }}
        >
          {transcripts.map((tx) => (
            <ToggleButton key={tx.id} value={tx.id} sx={commonTypographyStyle}>
              {tx.accession}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      ) : (
        <Typography sx={commonTypographyStyle} component="div">
          No transcripts available.
        </Typography>
      )}
    </Box>
  );

  // BLAST handler
  const handleBlastClick = () => {
    if (gene?.accessionId && gene?.sequence) {
      sessionStorage.setItem(
        "blastPrefill",
        JSON.stringify({
          accession: gene.accessionId,
          sequence: gene.sequence,
        })
      );
      router.push("/blast");
    }
  };

  const navButtons = [
    { label: "SEQUENCES", key: "SEQUENCES-NV" },
    { label: "JBROWSER", key: "JBROWSER-NV" },
    { label: "EXPRESSION", key: "EXPRESSION-NV" },
  ];
  if (organism?.id === "PBDJAMAPAORG000001") {
    navButtons.push({ label: "GENE EXPRESSION", key: "EXPRESSION-NV" });
  }

  return (
    <Box
      sx={{
        width: "90%",
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 5,
        py: 2,
        gap: 1,
      }}
    >
      <Box sx={{ width: "90%" }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: {
              xs: "1.2rem",
              sm: "1.9rem",
              md: "2.4rem",
              lg: "2.9rem",
              xl: "3.4rem",
            },
            fontWeight: 500,
          }}
        >
          {gene?.accession}
        </Typography>
      </Box>

      <Box sx={{ width: "90%" }}>
        <Typography
          variant="h4"
          color="secondary"
          sx={{
            fontSize: {
              xs: "1rem",
              sm: "1.2rem",
              md: "1.5rem",
              lg: "1.8rem",
              xl: "2rem",
            },
          }}
        >
          Gene Information:
        </Typography>
      </Box>

      {/* Detailed information */}
      <Box sx={{ width: "90%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <InfoItem label="Name" value={gene?.name} />
          <InfoItem label="Gene Identifier" value={gene?.accessionId} />
          <InfoItem label="Organism" value={organism?.name} />
          <InfoItem label="Chromosome" value={chromosome?.name} />
          <TranscriptsSection
            transcripts={transcripts}
            selected={selectedTranscript}
            onChange={setSelectedTranscript}
          />
          <InfoItem label="Location" value={`${gene?.start} - ${gene?.end}`} />
          <InfoItem label="Description" value={gene?.description} />
        </Box>
      </Box>

      <Box
        sx={{
          width: "90%",
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          justifyContent: "center",
          mt: 2,
        }}
      >
        {navButtons.map((btn) => (
          <Button
            key={btn.key}
            variant="contained"
            onClick={() => onNavClick?.(btn.key)}
            sx={{ textTransform: "none" }}
          >
            {btn.label}
          </Button>
        ))}

        <Button
          variant="contained"
          color="primary"
          onClick={handleBlastClick}
          sx={{ textTransform: "none" }}
        >
          BLAST
        </Button>
      </Box>
    </Box>
  );
}
