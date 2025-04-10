"use client";

import { useRouter } from "next/navigation";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { datasets } from "@/static/datasets/";

const URI_JBROWSE = `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_JBROWSE_PORT}`;

const buildJBrowseUrl = (dataset) => {
  const sessionValue = `spec-${JSON.stringify(dataset.sessionDefect)}`;
  const query = new URLSearchParams({
    config: "config.json",
    session: sessionValue,
  }).toString();
  return `${URI_JBROWSE}/?${query}`;
};

export default function JBrowsePage() {
  const router = useRouter();

  const handleDatasetClick = (dataset) => {
    const url = buildJBrowseUrl(dataset);
    router.push(url);
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
          Datasets available
        </Typography>
        <List>
          {datasets.map((dataset) => (
            <ListItem
              key={dataset._id}
              disablePadding
              sx={{ cursor: "pointer" }}
              onClick={() => handleDatasetClick(dataset)}
            >
              <ListItemText
                primary={dataset.organism}
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
  );
}
