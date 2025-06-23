//standard

//third party
import { CircularProgress, Box, Typography } from "@mui/material";

//local

export default function DataHandler({ loading, error, data, term, children }) {
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

  if (!data || data.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 2,
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
          No gene matches: {term}
        </Typography>
      </Box>
    );
  }

  return children;
}
