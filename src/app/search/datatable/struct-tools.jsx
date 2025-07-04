"use client";

// standard
import React from "react";

// third party
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

// local

// List of redirect routes displayed in the tools section
const pages = [
  { name: "Gene Expression", path: "/expression" },
  { name: "Genome Browser", path: "/jbrowser" },
];

export default function StructTools() {
  return (
    <Box
      sx={{
        background: "white",
        borderRadius: 2,
        boxShadow: 5,
        textAlign: "center",
        py: 1,
      }}
    >
      {/* Title of the tools section on the search page */}
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
          justifyContent: "center",
          gap: { xs: 2, md: 3 },
          py: { xs: 2, md: 2 },
          px: { xs: 1, md: 2 },
        }}
      >
        {/* Rendering array as buttons */}
        {pages.map((page) => (
          <Button
            key={page.name}
            component={Link}
            href={page.path}
            variant="contained"
            color="primary"
          >
            {page.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
