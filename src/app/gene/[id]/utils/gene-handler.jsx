//standard

//third party
import { CircularProgress, Box, Typography } from "@mui/material";

//local

export default function GeneHandler({ loading, error, children }) {
  if (loading)
    return (
      <Box sx={{ textAlign: "center", my: 3 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 3,
        }}
      >
        <Box
          sx={{
            width: "90%",
            background: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
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
      </Box>
    );

  return children;
}
