"use client";

// standard
import { useState } from "react";
import { useRouter } from "next/navigation";

// third party
import { Box, TextField, Button } from "@mui/material";

// local

export default function SearchGene() {
  const [searchGene, setSearchGene] = useState("");
  const [errorGene, setErrorGene] = useState("");
  const router = useRouter();

  // Only letters and numbers are allowed
  const allowedRegex = /^[A-Za-z0-9]+$/;
  const maxLength = 25; // Límite de caracteres

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
            const value = e.target.value;
            setSearchGene(value);
          }}
          error={!!errorGene}
          helperText={errorGene}
          InputProps={{
            style: {
              borderRadius: 25,
              backgroundColor: "white",
              color: "#9e9e9e",
            },
          }}
          sx={{
            width: { xs: "100%", md: "70%" },
            maxWidth: "900px",
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{
            borderRadius: 2,
            color: "black",
            padding: "10px 30px",
            width: { xs: "100%", md: "auto" },
          }}
        >
          SEARCH
        </Button>
      </Box>
    </Box>
  );
}
