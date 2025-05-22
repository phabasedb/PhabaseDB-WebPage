// src/app/about/page.jsx

// standard

// third party
import { Box, Typography } from "@mui/material";

// local
import { team } from "@/static/about";

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
          p: 2,
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

      {/* Team member cards */}
      <Box
        sx={{
          width: "90%",
          my: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {team.members.map((member) => (
          <Box
            key={member.email}
            sx={{
              width: { xs: "100%", sm: "45%", md: "30%", lg: "22%" },
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 3,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Photo */}
            <Box
              sx={{
                width: "100%",
                height: 0,
                pt: "100%", // 16:9 aspect ratio
                position: "relative",
                backgroundColor: "grey.200",
              }}
            >
              <img
                src={member.photo}
                alt={member.name}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Info */}
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {member.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {member.role}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.85rem", mb: 0.5 }}>
                {member.degree}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.85rem", mb: 1 }}>
                {member.institution}
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{ fontSize: "0.85rem" }}
              >
                {member.email}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
