"use client";

import { useParams } from "next/navigation";
import { Box, Typography } from "@mui/material";

export default function DatasetPage() {
  const { dataset } = useParams();

  // Construimos la URL para el iframe. Por ejemplo, para "jamapa" se generará:
  // http://192.168.0.14:5000/?config=phabase%2Fjamapa%2Fconfig.json
  const configUrl = `http://192.168.0.14:5000/?config=phabase%2F${dataset}%2Fconfig.json`;

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
