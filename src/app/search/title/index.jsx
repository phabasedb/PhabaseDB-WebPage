// standard

// third party
import { Box, Typography } from "@mui/material";

// local

export default function Title() {
  return (
    <Box sx={{ my: 1 }}>
      <Typography
        variant="h1"
        sx={{
          pl: { xs: 3, md: 6 },
          fontWeight: 500,
          fontSize: {
            xs: "2rem",
            sm: "3rem",
            md: "4rem",
            lg: "4.5rem",
            xl: "5rem",
          },
        }}
      >
        Search Gene Result
      </Typography>
    </Box>
  );
}
