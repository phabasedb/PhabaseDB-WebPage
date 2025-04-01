"use client";

// standard
import { useState } from "react";

// third party
import { useRouter } from "next/navigation";
import { Box, TextField, Button } from "@mui/material";

// local

export default function SearchGene() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim() === "") return;
    // Redirige a /search/tuTerminoBuscado
    router.push(`/search/${encodeURIComponent(searchTerm)}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        my: 2,
        width: "100%",
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            style: {
              borderRadius: "25px",
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
            borderRadius: "10px",
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
