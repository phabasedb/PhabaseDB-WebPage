//standard

//third party
import { Box, Typography } from "@mui/material";

//local

/**
 * Function that displays a centered and stylized error box only for the gene page in each section.
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
