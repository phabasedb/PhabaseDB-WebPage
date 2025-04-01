"use client";

// standard
import React from "react";

// third party
import { Box, Typography, Button } from "@mui/material";

// local

export default function StructOptionSearch() {
  return (
    <Box
      sx={{
        background: "white",
        borderRadius: "25px",
        textAlign: "center",
        py: 1,
      }}
    >
      <Typography
        variant="h6"
        sx={{ py: { xs: 1, md: 1 }, px: { xs: 1, md: 2 } }}
      >
        Resume search in:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          gap: { xs: 2, md: 3 },
          py: { xs: 2, md: 2 },
          px: { xs: 1, md: 2 },
          justifyContent: "center",
        }}
      >
        <Button variant="contained" color="primary">
          GENE EXPRESSION
        </Button>
        <Button variant="contained" color="primary">
          JBROWSER
        </Button>
      </Box>
    </Box>
  );
}
