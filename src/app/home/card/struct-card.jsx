// standard

// third party
import { Box, Card, CardMedia, Typography } from "@mui/material";

// local
import highlightText from "@/shared/text-Highlighter";

export default function StructCard({ item, index }) {
  return (
    <Box
      sx={{
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Informative card component with responsive layout and visual effects */}
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: 2,
          borderRadius: 1,
          flexDirection: {
            xs: "column",
            md: index % 2 === 0 ? "row" : "row-reverse",
          },
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: 5,
          },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* Informative image section */}
          <CardMedia
            component="img"
            image={item.image}
            alt="Informative image"
            sx={{
              width: "100%",
              height: "auto",
            }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Description section with dynamic text formatting */}
          <Typography
            variant="body1"
            sx={{
              p: 2,
              color: "black",
              textAlign: "justify",
              fontSize: {
                xs: "1rem",
                sm: "1.2rem",
                md: "1.4rem",
                lg: "1.6rem",
                xl: "1.7rem",
              },
              lineHeight: 1.5,
            }}
          >
            {highlightText(item.description, item.italic)}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
