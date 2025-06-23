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

  // Responsive row menssage error invalid input
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Search history storage function with a limit of 5.
  const handleSearch = () => {
    if (!validateInput(searchGene, setErrorGene)) return;

    const history = readHistory();
    const newHistory = updateHistoryArray(history, searchGene, 5);
    writeHistory(newHistory);

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

      {/**Conditional if there is an error in the search */}
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
