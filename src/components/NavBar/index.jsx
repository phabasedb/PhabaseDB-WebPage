"use client";

// standard
import { useState } from "react";

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
  { name: "Home", path: "/" },
  { name: "GeneExpression", path: "/expression" },
  { name: "GenomeBrowser", path: "/jbrowser" },
  { name: "BLAST", path: "/blast" },
  /*{ name: "Help", path: "/" },*/
  { name: "AboutUs", path: "/about" },
];

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: { xs: 1, md: 1 } }}>
      <AppBar position="sticky" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Small screen (movil) icon*/}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
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
                      <Typography
                        sx={{
                          textAlign: "center",
                        }}
                      >
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

            {/* Screen normal and desktop*/}
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
                gap: 1,
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
                      textTransform: "none",
                      textDecoration: "none",
                      fontSize: {
                        md: "1.2rem",
                        lg: "1.3rem",
                        xl: "1.4rem",
                      },
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
