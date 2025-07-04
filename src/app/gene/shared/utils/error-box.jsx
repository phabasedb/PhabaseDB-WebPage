//standard

//third party
import { Box, Typography } from "@mui/material";

//local

/**
 * Muestra un recuadro de error centrado y estilizado.
 */
export default function ErrorBoxPageGene({ text }) {
  return (
    <Box
      sx={{
        width: "90%",
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 5,
      }}
    >
      <Typography
        variant="body2"
        color="error"
        sx={{
          p: 2,
          lineHeight: 1.5,
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}
