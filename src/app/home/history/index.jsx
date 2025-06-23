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

  //Definition of general search terms.
  const generalTerms = [{ label: "GENE BROWSER", term: "GENES" }];

  //Loads the search history from local cache (localStorage).
  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(storedHistory);
  }, []);

  //Navigates to the search route for the selected term.
  const handleItemClick = (term) => {
    router.push(`/search/${encodeURIComponent(term)}`);
  };

  return (
    <Box
      sx={{
        my: { xs: 3, md: 3 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", md: "70%" },
          display: "flex",
          justifyContent: { xs: "center", md: "flex-start" },
          gap: 2,
        }}
      >
        {/*Iterates over general search terms and renders each as an interactive button */}
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

      {/* Render search history only if items exist */}
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
            {/* Search history title */}
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
            {/* Renders the search history stored in local cache */}
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
