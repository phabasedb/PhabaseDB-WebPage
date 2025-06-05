// about/TeamSection.jsx

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import ScienceIcon from "@mui/icons-material/Science";

export default function TeamSection({ members }) {
  return (
    <Box
      sx={{
        width: "90%",
        my: 3,
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
      }}
    >
      {members.map((member) => (
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
          {/* Image*/}
          <Box
            sx={{
              width: "100%",
              height: 0,
              pt: "100%", // mantiene aspecto cuadrado
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

          {/* Card information*/}
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {member.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 600, fontSize: "1.1rem", my: 1 }}
            >
              {member.role}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "1rem", my: 1 }}>
              {member.degree}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "1rem", my: 1 }}>
              {member.institution}
            </Typography>
            <Typography
              variant="body2"
              color="blue"
              sx={{ fontSize: "1rem", my: 1 }}
            >
              {member.email}
            </Typography>
            <Typography variant="body2" color="blue" sx={{ fontSize: "1rem" }}>
              {member.phone}
            </Typography>

            {/* Social icons and tooltips*/}
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
  );
}
