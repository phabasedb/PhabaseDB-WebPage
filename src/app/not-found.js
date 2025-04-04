"use client";

// standard

// third party
import { Box, Typography } from "@mui/material";

// local

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: 2,
        p: 1,
        my: 3,
      }}
    >
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
        404 - Page not found
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 500,
          fontSize: {
            xs: "1.2rem",
            sm: "1.4rem",
            md: "1.6rem",
            lg: "1.8rem",
            xl: "2rem",
          },
        }}
      >
        Sorry, the page you are looking for does not exist.
      </Typography>
    </Box>
  );
}
