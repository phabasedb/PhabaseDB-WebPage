import { Box, Typography } from "@mui/material";
import { team } from "@/static/about/index";

export default function AboutUs() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        my: { xs: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          width: "90%",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: 5,
        }}
      >
        <Box sx={{ width: "90%", my: 1 }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: {
                xs: "1.3rem",
                sm: "1.5rem",
                md: "1.7rem",
                lg: "1.9rem",
                xl: "2.1rem",
              },
            }}
          >
            Meet the Team
          </Typography>
        </Box>
        <Box sx={{ width: "90%", my: 1 }}>
          <Typography
            sx={{
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
                md: "1.1rem",
                lg: "1.3rem",
                xl: "1.5rem",
              },
              color: "text.secondary",
            }}
          >
            {team.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
