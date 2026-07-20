import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoNavbar from "../assets/navbar.png";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <AppBar position="fixed" elevation={0}>
        <Toolbar disableGutters>
          <Container
            maxWidth="lg"
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              component="img"
              src={logoNavbar}
              alt="Armero Technologies"
              sx={{ height: 44, width: "auto" }}
            />
          </Box>

          {isMobile ? (
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              aria-label="open navigation menu"
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              {NAV_LINKS.map(({ label, path }) => (
                <Button
                  key={path}
                  component={Link}
                  to={path}
                  color={pathname === path ? "primary" : "inherit"}
                  sx={{
                    fontWeight: pathname === path ? 600 : 400,
                    borderBottom:
                      pathname === path ? "2px solid" : "2px solid transparent",
                    borderColor:
                      pathname === path ? "primary.main" : "transparent",
                    borderRadius: 0,
                    pb: "2px",
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>
          )}
          </Container>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 220, bgcolor: "background.paper" } }}
      >
        <List sx={{ pt: 2 }}>
          {NAV_LINKS.map(({ label, path }) => (
            <ListItemButton
              key={path}
              component={Link}
              to={path}
              selected={pathname === path}
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
