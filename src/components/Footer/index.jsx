//standard

//third party
import { Box, Typography } from "@mui/material";
import Image from "next/image";

//local

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        textAlign: "center",
        backgroundColor: "background.main",
        width: "100%",
        boxShadow:
          "0px -2px 4px -1px rgba(0, 0, 0, 0.2), 0px -4px 5px 0px rgba(0, 0, 0, 0.14), 0px -1px 10px 0px rgba(0, 0, 0, 0.12)",
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 1, md: 0 },
        py: 1,
        mt: 2,
      }}
    >
      {/* Logo Izquierdo */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          ml: { xs: 0, md: 3 },
        }}
      >
        <Image
          src="/image/logos/logoFooterUNAM.webp"
          alt="Logo UNAM"
          width={200}
          height={100}
        />
      </Box>

      {/* Texto central */}
      <Typography variant="body2" sx={{ color: "black", fontWeight: 500 }}>
        © 2025 All rights reserved. CCG-UNAM
      </Typography>

      {/* Logo Derecho */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mr: { xs: 0, md: 3 },
        }}
      >
        <Image
          src="/image/logos/logoFooterCCG.webp"
          alt="Logo CCG"
          width={200}
          height={100}
        />
      </Box>
    </Box>
  );
}
