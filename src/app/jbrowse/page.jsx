"use client";

//third party
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

//local
import { datasets } from "@/static/jbrowse/datasets";
import { buildJBrowseUrlFromSession } from "@/shared/jbrowse/build-url-from-session";

export default function JBrowsePage() {
  const validDatasets = datasets.filter(
    ({ id, organism, sessionDefault }) =>
      id && organism && sessionDefault?.views?.length > 0
  );

  const handleDatasetClick = (sessionDefault) => {
    const { url, message } = buildJBrowseUrlFromSession({
      sessionDefault,
    });
    if (!url) {
      console.error("JBrowse:", message);
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
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
            {validDatasets.map(({ id, organism, sessionDefault }) => (
              <ListItem
                key={id}
                disablePadding
                sx={{ cursor: "pointer" }}
                onClick={() => handleDatasetClick(sessionDefault)}
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
