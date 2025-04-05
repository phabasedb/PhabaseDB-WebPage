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
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Datasets disponibles para JBrowse
      </Typography>
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
  );
}
