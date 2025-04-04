"use client";

// standard
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// third party
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemIcon,
} from "@mui/material";
import Image from "next/image"; // Importar el componente Image

// local

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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: { xs: 3, md: 4 },
      }}
    >
      {history.length > 0 && (
        <Box
          sx={{
            width: { xs: "90%", md: "70%" },
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 5,
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, p: 1 }}>
              Search History
            </Typography>
          </Box>
          <Box
            sx={{
              maxHeight: "250px",
              overflowY: "auto",
              p: 1,
            }}
          >
            <List>
              {history.map((item, index) => (
                <ListItem
                  key={index}
                  divider
                  role="listitem"
                  sx={{
                    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                    cursor: "pointer",
                  }}
                  onClick={() => handleItemClick(item)}
                >
                  <ListItemIcon>
                    <Image
                      src="/image/home/iconBean.webp"
                      alt="Icon Bean"
                      width={24}
                      height={24}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                    sx={{
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      )}
    </Box>
  );
}
