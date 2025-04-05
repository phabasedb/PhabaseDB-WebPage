"use client";

import { useParams } from "next/navigation";
import { Box, Typography } from "@mui/material";

export default function DatasetPage() {
  const { dataset } = useParams();

  if (!dataset) {
    return (
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography variant="h6">No dataset specified</Typography>
      </Box>
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const portJBrowse = process.env.NEXT_PUBLIC_JBROWSER_PORT;
  const configUrl = `${baseUrl}${portJBrowse}/?config=phabase%2F${dataset}%2Fconfig.json`;

  return (
    <Box sx={{ maxWidth: "100%", margin: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        JBrowse para {dataset}
      </Typography>
      <Box sx={{ width: "100%", height: "80vh" }}>
        <iframe
          src={configUrl}
          title="JBrowse"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </Box>
    </Box>
  );
}
