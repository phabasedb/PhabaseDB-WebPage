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

// local
import { useTheme } from "@mui/material/styles";
import { validateInput } from "./utils/input-validation";
import {
  readHistory,
  updateHistoryArray,
  writeHistory,
} from "./utils/history-array";

export default function SearchGene() {
  const [searchGene, setSearchGene] = useState("");
  const [errorGene, setErrorGene] = useState("");
  const router = useRouter();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleSearch = () => {
    const normalized = searchGene.trim();

    if (!validateInput(normalized, setErrorGene)) return;

    const history = readHistory();
    const newHistory = updateHistoryArray(history, normalized, 5);
    writeHistory(newHistory);

    router.push(`/search/${encodeURIComponent(normalized)}`);
  };

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
          error={!!errorGene}
          helperText={isSmallScreen ? errorGene : ""}
          onChange={(e) => {
            setSearchGene(e.target.value);
            if (errorGene) setErrorGene("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
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
          onClick={handleSearch}
          sx={{
            backgroundColor: "#E46951",
            borderRadius: 2,
            py: 1.5,
            px: 3,
            width: { xs: "100%", md: "auto" },
            fontWeight: "bold",
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
