"use client";
import { datasets } from "@/static/blast/datasets";

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
        borderRadius: 2,
        boxShadow: 5,
        p: 1,
      }}
    >
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
        BLAST
      </Typography>
    </Box>
  </Box>
);
