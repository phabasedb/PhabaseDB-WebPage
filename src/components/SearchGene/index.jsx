"use client";

// standard
import { useState } from "react";
import { useRouter } from "next/navigation";

// third party
import {
  Box,
  TextField,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// local

export default function SearchGene() {
  const [searchGene, setSearchGene] = useState("");
  const [errorGene, setErrorGene] = useState("");
  const router = useRouter();

  // Responsive row menssage error invalid input
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Only letters and numbers are allowed
  const allowedRegex = /^[A-Za-z0-9]+$/;
  const maxLength = 25; // Limit de characteres

  // Function validate Input Search Gene
  const validateInput = (value) => {
    if (value.trim() === "") {
      setErrorGene("The field cannot be empty.");
      return false;
    }
    if (value.length > maxLength) {
      setErrorGene(`The term cannot exceed  ${maxLength} characters.`);
      return false;
    }
    if (!allowedRegex.test(value)) {
      setErrorGene("Only alphanumeric characters are allowed.");
      return false;
    }
    setErrorGene("");
    return true;
  };
  // ---

  // Search storage function with a limit of 10.
  const handleSearch = () => {
    if (!validateInput(searchGene)) return;
    let storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    storedHistory = storedHistory.filter((term) => term !== searchGene);
    storedHistory.unshift(searchGene);
    if (storedHistory.length > 10) {
      storedHistory = storedHistory.slice(0, 10);
    }
    localStorage.setItem("searchHistory", JSON.stringify(storedHistory));
    router.push(`/search/${encodeURIComponent(searchGene)}`);
  };
  // ---

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        my: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          gap: { xs: 1, md: 2 },
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search Gene"
          value={searchGene}
          onChange={(e) => {
            setSearchGene(e.target.value);
          }}
          error={isSmallScreen && !!errorGene}
          helperText={isSmallScreen ? errorGene : ""}
          InputProps={{
            style: {
              borderRadius: 25,
              backgroundColor: "white",
              color: "#9e9e9e",
            },
          }}
          sx={{
            width: { xs: "100%", md: "70%" },
            maxWidth: 900,
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{
            borderRadius: 2,
            py: 1.5,
            px: 3,
            width: { xs: "100%", md: "auto" },
          }}
        >
          SEARCH
        </Button>
      </Box>

      {!isSmallScreen && errorGene && (
        <Box
          sx={{
            width: { md: "70%", lg: "70%", xl: "70%" },
            maxWidth: 950,
            p: 1,
          }}
        >
          <Typography variant="body2" color="error">
            {errorGene}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
