//standard

//third party
import { Box, Typography } from "@mui/material";

//local
import highlightText from "@/shared/text/utils/highlight-text";

export default function InformationSection({ information }) {
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
        {/* Title Page*/}
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
          About Phabase
        </Typography>

        {information.map((info, idx) => (
          <Box key={idx} sx={{ mt: 2 }}>
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
              {info.title}
            </Typography>

            {/* Description*/}
            {info.content.description && (
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
                {highlightText(
                  info.content.description,
                  info.content.italic || [],
                  "em"
                )}
              </Typography>
            )}

            {/* Points */}
            {Array.isArray(info.content.points) &&
              info.content.points.length > 0 && (
                <Box
                  component="ul"
                  sx={{ pl: 2, mt: 1, color: "text.secondary" }}
                >
                  {info.content.points.map((pt, i) => (
                    <Box
                      component="li"
                      key={i}
                      sx={{
                        my: 0.5,
                        fontSize: {
                          xs: "0.9rem",
                          sm: "0.95rem",
                          md: "1rem",
                          lg: "1.1rem",
                          xl: "1.2rem",
                        },
                      }}
                    >
                      {pt}
                    </Box>
                  ))}
                </Box>
              )}

            {/* Contact*/}
            {info.content.contact && (
              <Box sx={{ mt: 1, color: "text.secondary" }}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.9rem",
                      sm: "0.95rem",
                      md: "1rem",
                      lg: "1.1rem",
                      xl: "1.2rem",
                    },
                  }}
                >
                  <strong>Authors:</strong>{" "}
                  {info.content.contact.authors.join(" and ")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.9rem",
                      sm: "0.95rem",
                      md: "1rem",
                      lg: "1.1rem",
                      xl: "1.2rem",
                    },
                  }}
                >
                  <strong>Institution:</strong>{" "}
                  {info.content.contact.institution}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.9rem",
                      sm: "0.95rem",
                      md: "1rem",
                      lg: "1.1rem",
                      xl: "1.2rem",
                    },
                  }}
                >
                  <strong>Email:</strong> {info.content.contact.email}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.9rem",
                      sm: "0.95rem",
                      md: "1rem",
                      lg: "1.1rem",
                      xl: "1.2rem",
                    },
                  }}
                >
                  <strong>Website:</strong>{" "}
                  <a
                    href={info.content.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {info.content.contact.website}
                  </a>
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
