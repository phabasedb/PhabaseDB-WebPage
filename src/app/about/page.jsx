// src/app/about/page.jsx

// standard

// third party
import { Box, Typography, Card, CardContent, Tooltip } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import ScienceIcon from "@mui/icons-material/Science";
import IconButton from "@mui/material/IconButton";

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
          <Typography
            sx={{
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
                md: "1.1rem",
                lg: "1.3rem",
                xl: "1.5rem",
              },
              textAlign: "justify",
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
          mt: 3,
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {team.members.map((member) => (
          <Card
            key={member.email}
            sx={{
              width: { xs: "100%", sm: "45%", md: "30%", lg: "22%" },
              boxShadow: 2,
              borderRadius: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: 5,
              },
              background:
                "radial-gradient(circle, rgba(186,218,85,1) 65%, rgba(255,218,121,1) 98%)",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: 0,
                pt: "100%", // 16:9 aspect ratio at 80% width
                position: "relative",
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
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {member.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 600, my: 1 }}
              >
                {member.role}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.85rem", my: 1 }}>
                {member.degree}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.85rem", my: 1 }}>
                {member.institution}
              </Typography>
              <Typography
                variant="body2"
                color="blue"
                sx={{ fontSize: "0.85rem", my: 1 }}
              >
                {member.email}
              </Typography>
              <Typography
                variant="body2"
                color="blue"
                sx={{ fontSize: "0.85rem" }}
              >
                {member.phone}
              </Typography>
              {/* Iconos sociales con tooltips */}
              <Box
                sx={{
                  my: 1,
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                {member.social.linkedin && (
                  <Tooltip title="LinkedIn">
                    <IconButton
                      component="a"
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener"
                      size="small"
                    >
                      <LinkedInIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {member.social.researchgate && (
                  <Tooltip title="ResearchGate">
                    <IconButton
                      component="a"
                      href={member.social.researchgate}
                      target="_blank"
                      rel="noopener"
                      size="small"
                    >
                      <ScienceIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {member.social.ccg && (
                  <Tooltip title="CCG Profile">
                    <IconButton
                      component="a"
                      href={member.social.ccg}
                      target="_blank"
                      rel="noopener"
                      size="small"
                    >
                      <LanguageIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
