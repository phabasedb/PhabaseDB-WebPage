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
import Image from "next/image";

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
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                p: 1,
                fontSize: {
                  xs: "1.1rem",
                  sm: "1.2rem",
                  md: "1.3rem",
                  lg: "1.4rem",
                  xl: "1.5rem",
                },
              }}
            >
              Search History
            </Typography>
          </Box>
          <Box
            sx={{
              maxHeight: { xs: 250, sm: 265, md: 280, lg: 315, xl: 325 },
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
                    primaryTypographyProps={{
                      fontSize: {
                        xs: "1rem",
                        sm: "1.1rem",
                        md: "1.2rem",
                        lg: "1.5rem",
                        xl: "1.6rem",
                      },
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
