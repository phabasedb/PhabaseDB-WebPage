// standard

// third party
import { Box, Card, Typography, Link } from "@mui/material";

// local
import StructCard from "./struct-card";
import { home } from "@/static/text/us-US";

export default function InformationCard() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
          my: 1,
        }}
      >
        {home.map((item, index) => (
          <StructCard key={index} item={item} index={index} />
        ))}

        {/**New Session Text Citing Phabase */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
          }}
        >
          <Box>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 2,
                borderRadius: 1,
                flexDirection: "column",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 5,
                },
                background:
                  "radial-gradient(circle, rgba(186,218,85,1) 65%, rgba(255,218,121,1) 98%)",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  px: 2,
                  pt: 2,
                  pb: 1,
                  color: "black",
                  textAlign: "justify",
                  fontWeight: 600,
                  fontSize: {
                    xs: "1rem",
                    sm: "1.2rem",
                    md: "1.4rem",
                    lg: "1.6rem",
                    xl: "2rem",
                  },
                  lineHeight: 1.5,
                }}
              >
                CITING PHABASE
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  px: 2,
                  pb: 2,
                  color: "black",
                  textAlign: "justify",
                  fontSize: {
                    xs: "1rem",
                    sm: "1.2rem",
                    md: "1.4rem",
                    lg: "1.6rem",
                    xl: "2rem",
                  },
                  lineHeight: 1.5,
                }}
              >
                SALGADO, H., LOZANO, L., PACHECO, L., FORMEY, D. AND MONTIEL, J.
                TRANSCRIPTOME ATLAS AND DE NOVO ASSEMBLY OF THE NEGRO JAMAPA
                COMMON BEAN GENOME. DOI:{" "}
                <Link
                  href="https://doi.org/"
                  target="_blank"
                  rel="noopener"
                  sx={{
                    color: "black",
                    textDecoration: "underline",
                  }}
                >
                  HTTPS://DOI.ORG/BIORXIV.ORG
                </Link>
              </Typography>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
