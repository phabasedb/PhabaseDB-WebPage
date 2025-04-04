"use client";

// standard
import React from "react";

// third party
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import Link from "next/link";

// local

const pages = [
  { name: "Gene Browser", path: "/" },
  { name: "Gene Expression", path: "/" },
  { name: "JBrowser", path: "/" },
  { name: "BLAST", path: "/" },
  { name: "Help", path: "/" },
  { name: "About Us", path: "/" },
];

/**Manejo de estados:
 * anchorEl: Guarda la referencia del menú abierto.
 * handleOpenMenu: Se ejecuta cuando hacemos clic en el menú o icono.
 * handleCloseMenu: Se ejecuta cuando cerramos el menú.
 */
export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  /**Estructura de la AppBar
   * Nota: position="sticky": Mantiene la barra fija al hacer scroll.
   *       position="static": Se mantiene fija la barra al top de la pagina.
   * Container maxWidth="xl": Ajusta la barra al tamaño de pantalla.
   */
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Enfocado a movil o pantalla pequeña enseña icono de menu*/}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Link
                      href={page.path}
                      passHref
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {page.name}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
              <img
                src="/image/logos/logoHeadNav.webp"
                alt="Logo"
                style={{ height: 40 }}
              />
            </Box>

            {/* Enfocado a pantallas normales o escritorio*/}
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <img
                src="/image/logos/logoHeadNav.webp"
                alt="Logo"
                style={{ height: 40 }}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                mr: 2,
                justifyContent: "center",
              }}
            >
              {pages.map((page) => (
                <Link
                  key={page.name}
                  href={page.path}
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    sx={{
                      my: 1,
                      color: "black",
                      display: "block",
                      fontWeight: 500,
                      textTransform: "none",
                      textDecoration: "none",
                    }}
                    onClick={handleCloseNavMenu}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
