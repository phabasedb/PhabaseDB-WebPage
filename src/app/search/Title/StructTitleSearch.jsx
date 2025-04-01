// standard

// third party
import { Box, Typography } from "@mui/material";

// local

export default function StructTitleSearch() {
  return (
    <Box sx={{ my: 2 }}>
      <Typography
        variant="h2"
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
