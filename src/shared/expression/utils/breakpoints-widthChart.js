// standard

// third party
import { useTheme, useMediaQuery } from "@mui/material";

// local

/**
 * Devuelve un ancho “fallback” según los breakpoints de Material UI.
 * Útil cuando aún no conocemos el ancho real del contenedor(por defecto).
 */
export default function useBreakpointWidthExpChart() {
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  if (isXl) return 1350;
  if (isLg) return 1050;
  if (isMd) return 780;
  if (isSm) return 500;
  return 250;
}
