"use client";

import { useRouter } from "next/navigation";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

export default function GeneExpressionPage() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        my: { xs: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          width: "90%",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: 5,
        }}
      >
        <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
          <img
            src="/image/home/geneexpression.webp"
            alt="Example Gene Expression"
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
