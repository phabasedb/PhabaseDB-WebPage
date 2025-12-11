"use client";

//standard

//third party
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

//local
import { datasets } from "@/static/jbrowse/datasets";
import { createJBrowseUrlFromSession } from "@/shared/jbrowse/builduri-jbrowse";

export default function JBrowsePage() {
  const validDatasets = datasets.filter(
    ({ id, organism, sessionDefect }) => id && organism && sessionDefect
  );

  const handleDatasetClick = (sessionDefect) => {
    const url = createJBrowseUrlFromSession({ sessionDefect });
    if (!url) return;
    window.open(url, "_blank", "noopener");
  };

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
        {/* Title Page */}
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
            Datasets available
          </Typography>
          {/* Listing of the contents of the data set */}
          <List>
            {validDatasets.map(({ id, organism, sessionDefect }) => (
              <ListItem
                key={id}
                disablePadding
                sx={{ cursor: "pointer" }}
                onClick={() => handleDatasetClick(sessionDefect)}
              >
                <ListItemText
                  primary={organism}
                  sx={{
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  primaryTypographyProps={{
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1.1rem",
                      md: "1.2rem",
                      lg: "1.4rem",
                      xl: "1.6rem",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
}
