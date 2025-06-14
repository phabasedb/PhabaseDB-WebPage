"use client";

// standard
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// third party
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import Image from "next/image";

// local

export default function SearchHistory() {
  const [history, setHistory] = useState([]);
  const router = useRouter();

  const generalTerms = [{ label: "GENE BROWSER", term: "GENES" }];

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
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", md: "70%" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            //flexWrap: "wrap",
            gap: 2,
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          {generalTerms.map((termObj) => (
            <Button
              key={termObj.label}
              onClick={() => handleItemClick(termObj.term)}
              sx={{
                textTransform: "none",
                color: "#0B3AA1",
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  md: "1.2rem",
                  lg: "1.5rem",
                  xl: "1.6rem",
                },
                p: 1,
              }}
            >
              →{termObj.label}
            </Button>
          ))}
        </Box>
      </Box>

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
                p: 1,
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  md: "1.2rem",
                  lg: "1.3rem",
                  xl: "1.4rem",
                },
              }}
            >
              Search History
            </Typography>
          </Box>
          <Box>
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
                      color: "#0B3AA1",
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
                      noWrap: false,
                      style: {
                        whiteSpace: "normal",
                        wordBreak: "break-word",
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
