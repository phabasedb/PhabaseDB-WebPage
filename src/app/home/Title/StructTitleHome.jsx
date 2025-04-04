// standard

// third party
import { Typography, Box } from "@mui/material";

// local

export default function StructTitleHome() {
  return (
    <Box sx={{ flexGrow: 1, my: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 1, md: 2 },
          }}
        >
          <Box
            component="img"
            src="/image/logos/LogoPhabaseIA.webp"
            alt="Phabase Logo"
            sx={{
              width: {
                xs: "80px",
                sm: "100px",
                md: "110px",
                lg: "120px",
                xl: "130px",
              },
              height: "auto",
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontWeight: "bold",
              letterSpacing: { xs: 10, md: 15 },
              fontSize: {
                xs: "2.6rem",
                sm: "3.5rem",
                md: "4rem",
                lg: "4.5rem",
                xl: "5rem",
              },
            }}
          >
            Phabase
          </Typography>
        </Box>
        <Typography
          variant="h2"
          color="secondary"
          sx={{
            fontWeight: 500,
            fontSize: {
              xs: "1.2rem",
              sm: "1.4rem",
              md: "1.6rem",
              lg: "1.8rem",
              xl: "2rem",
            },
            lineHeight: 1.5,
            textAlign: "center",
            maxWidth: "90%",
          }}
        >
          A genomic and transcriptomic database for Phaseolus spp
        </Typography>
      </Box>
    </Box>
  );
}
