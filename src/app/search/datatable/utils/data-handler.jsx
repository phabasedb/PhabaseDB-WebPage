//standard

//third party
import { CircularProgress, Box, Typography } from "@mui/material";

//local

export default function DataHandler({ loading, error, children }) {
  if (loading) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 5,
        }}
      >
        <Typography
          variant="body2"
          color="error"
          sx={{
            p: 2,
            lineHeight: 1.5,
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {error}
        </Typography>
      </Box>
    );
  }

  return children;
}
