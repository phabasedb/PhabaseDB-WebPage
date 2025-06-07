import React from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Checkbox,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export function BlastForm({
  query,
  onQueryChange,
  databases,
  selected,
  onToggleDb,
  params,
  onParamsChange,
  loading,
  onSubmit,
}) {
  return (
    <Box
      sx={{
        width: "90%",
        bgcolor: "white",
        p: 2,
        borderRadius: 2,
        boxShadow: 5,
      }}
    >
      <Typography variant="h5" mb={2}>
        BLAST
      </Typography>

      <Typography>Sequence query:</Typography>
      <TextField
        multiline
        minRows={8}
        fullWidth
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        InputProps={{
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => onQueryChange("")}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Typography sx={{ mt: 2 }}>Databases:</Typography>
      {databases.map((db) => (
        <Box key={db.path}>
          <Checkbox
            checked={selected.includes(db.path)}
            onChange={() => onToggleDb(db.path)}
          />
          {db.name}
        </Box>
      ))}

      <Typography sx={{ mt: 2 }}>Advanced params:</Typography>
      {Object.entries(params).map(([key, value]) => (
        <TextField
          key={key}
          label={key}
          value={value}
          onChange={(e) => onParamsChange(key, e.target.value)}
          fullWidth
          sx={{ mt: 1 }}
        />
      ))}

      <Box textAlign="center" mt={2}>
        <Button variant="contained" disabled={loading} onClick={onSubmit}>
          {loading ? <CircularProgress size={24} /> : "Run BLAST"}
        </Button>
      </Box>
    </Box>
  );
}
