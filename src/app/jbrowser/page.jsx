"use client";

import { useRouter } from "next/navigation";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

export default function JBrowsePage() {
  const router = useRouter();

  // Simulación de datasets disponibles
  const datasets = [
    {
      id: "jamapa",
      name: "Phaseolus vulgaris cv. Negro Jamapa",
    },
    // Puedes agregar más datasets según sea necesario
  ];

  return (
    <Box
      sx={{
        my: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          width: "90%",
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">Datasets available</Typography>
        <List>
          {datasets.map((dataset) => (
            <ListItem
              key={dataset.id}
              disablePadding
              sx={{ cursor: "pointer" }}
              onClick={() =>
                router.push(`/jbrowser/${encodeURIComponent(dataset.id)}`)
              }
            >
              <ListItemText
                primary={dataset.name}
                sx={{
                  color: "blue",
                  "&:hover": { textDecoration: "underline" },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
