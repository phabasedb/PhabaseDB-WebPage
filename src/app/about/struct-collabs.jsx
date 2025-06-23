//standard

//third party
import { Box, Typography } from "@mui/material";

//local

export default function CollaborationsSection({ collaborations }) {
  return (
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
      <Box sx={{ width: "90%", mt: 1, mb: 3 }}>
        {/* Title */}
        <Typography
          sx={{
            fontSize: {
              xs: "1.1rem",
              sm: "1.2rem",
              md: "1.3rem",
              lg: "1.4rem",
              xl: "1.5rem",
            },
          }}
        >
          {collaborations.title}
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            mt: 0.5,
            textAlign: "justify",
            color: "text.secondary",
            fontSize: {
              xs: "0.9rem",
              sm: "0.95rem",
              md: "1rem",
              lg: "1.1rem",
              xl: "1.2rem",
            },
          }}
        >
          {collaborations.content.description}
        </Typography>

        {/* List acknowledgments */}
        <Box sx={{ mt: 2 }}>
          {collaborations.content["acknowledgments"].map((item, i) => (
            <Box
              key={i}
              sx={{
                mb: 1,
                textAlign: "justify",
                fontSize: {
                  xs: "1rem",
                  sm: "1rem",
                  md: "1.1rem",
                  lg: "1.2rem",
                  xl: "1.3rem",
                },
              }}
            >
              <Box component="span" sx={{ fontWeight: "bold" }}>
                {item.name}
              </Box>
              {" – "}
              <Box component="span" sx={{ color: "text.secondary" }}>
                {item.desc}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Text in the middle */}
        <Typography
          sx={{
            mt: 2,
            textAlign: "justify",
            color: "text.secondary",
            fontSize: {
              xs: "0.9rem",
              sm: "0.95rem",
              md: "1rem",
              lg: "1.1rem",
              xl: "1.2rem",
            },
          }}
        >
          {collaborations.content["descrip-in-middle"]}
        </Typography>

        {/* List thanks-people */}
        {collaborations.content["thanks-people"].map((item, i) => (
          <Box key={i}>
            <Typography
              sx={{
                mt: 1,
                fontSize: {
                  xs: "0.8rem",
                  sm: "0.8rem",
                  md: "0.9rem",
                  lg: "1rem",
                  xl: "1.1rem",
                },
                fontWeight: "bold",
              }}
            >
              {item.name}
            </Typography>
            <Typography
              sx={{
                mt: 0,
                fontSize: {
                  xs: "0.8rem",
                  sm: "0.8rem",
                  md: "0.9rem",
                  lg: "1rem",
                  xl: "1.1rem",
                },
                textAlign: "justify",
                color: "text.secondary",
              }}
            >
              {item.desc}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
