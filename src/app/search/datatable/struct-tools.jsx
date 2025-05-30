"use client";

// standard
import React from "react";

// third party
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

// local

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
