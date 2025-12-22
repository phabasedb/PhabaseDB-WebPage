// standard

// third party
import { Box, Typography, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

//local

// Legend colors
const LEGEND_COLORS = {
  fiveUTR: { oneColor: "#AED2B3", twoColor: "#D7E9D9" },
  CDS: { oneColor: "#ACBADA", twoColor: "#D8DFEE" },
  threeUTR: { oneColor: "#CBA8C5", twoColor: "#E3D0E0" },
};

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

export default function SequencesHeader({ onDownload }) {
  return (
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
              onClick={onDownload}
            >
              DOWNLOAD
            </Button>
          </Box>
        </Box>

        <Box sx={{ textAlign: "right", display: { xs: "none", md: "block" } }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={onDownload}
          >
            DOWNLOAD
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
