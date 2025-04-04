"use client";

import { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function SearchHistory() {
  const [history, setHistory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(storedHistory);
  }, []);

  const handleItemClick = (term) => {
    router.push(`/search/${encodeURIComponent(term)}`);
  };

  return (
    <Box
      sx={{
        width: { xs: "85%", md: "80%" },
        mx: "auto",
        mt: 3,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        Historial de búsqueda
      </Typography>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          p: 2,
          backgroundColor: "#fff",
          maxHeight: "250px", // Aproximadamente 5 elementos
          overflowY: "auto",
        }}
      >
        {history.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Aún no hay búsquedas en el historial.
          </Typography>
        ) : (
          <List>
            {history.map((item, index) => (
              <ListItem
                key={index}
                divider
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                  cursor: "pointer",
                }}
                onClick={() => handleItemClick(item)}
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}
