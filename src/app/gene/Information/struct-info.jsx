// standard

// third party
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

// local

export default function StructInfo({
  geneData,
  selectedTranscript,
  setSelectedTranscript,
}) {
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
      {transcripts.length > 0 ? (
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
          {geneData.accession}
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

      {/* Información detallada */}
      <Box sx={{ width: "90%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <InfoItem label="Name" value={geneData.name} />
          <InfoItem label="Gene Identifier" value={geneData.accession} />
          <InfoItem label="Organism" value={geneData.organism.name} />
          <InfoItem label="Chromosome" value={geneData.chromosome.name} />
          <TranscriptsSection
            transcripts={geneData.transcripts}
            selected={selectedTranscript}
            onChange={setSelectedTranscript}
          />
          <InfoItem
            label="Location"
            value={`${geneData.start} - ${geneData.end}`}
          />
          <InfoItem label="Description" value={geneData.description} />
        </Box>
      </Box>
    </Box>
  );
}
