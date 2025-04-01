// standard

// third party
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

// local

export default function StructInformGene({
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
      {transcripts && transcripts.length > 0 ? (
        <ToggleButtonGroup
          orientation="vertical"
          exclusive
          value={selected ? String(selected.transcriptId) : ""}
          onChange={(event, newTranscriptId) => {
            if (newTranscriptId !== null) {
              const newTranscript = transcripts.find(
                (t) => String(t.transcriptId) === newTranscriptId
              );
              onChange(newTranscript);
            }
          }}
          color="primary"
          sx={{
            display: "flex",
          }}
        >
          {transcripts.map((transcript) => (
            <ToggleButton
              key={transcript.transcriptId}
              value={String(transcript.transcriptId)}
              sx={commonTypographyStyle}
            >
              {transcript.transcriptIdOriginal}
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
          {geneData.geneIdOriginal}
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
          <InfoItem label="Name" value={geneData.geneName} />
          <InfoItem label="Gene Identifier" value={geneData.geneIdOriginal} />
          <InfoItem label="Organism" value={geneData.organismName} />
          <InfoItem label="Chromosome" value={geneData.chromosomeName} />
          <TranscriptsSection
            transcripts={geneData.transcripts || []}
            selected={selectedTranscript}
            onChange={setSelectedTranscript}
          />
          <InfoItem
            label="Location"
            value={`${geneData.geneStart} - ${geneData.geneEnd}`}
          />
          <InfoItem label="Description" value={geneData.geneDescription} />
        </Box>
      </Box>
    </Box>
  );
}
