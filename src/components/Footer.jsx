import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import logoIcon from "../assets/navbar.png";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/projects" },
  { label: "Contact", path: "/contact" },
];

const SOCIALS = [
  {
    label: "Facebook",
    icon: <FacebookIcon />,
    href: "#", // TODO: replace with Facebook page URL
  },
  {
    label: "Instagram",
    icon: <InstagramIcon />,
    href: "#", // TODO: replace with Instagram profile URL
  },
  {
    label: "YouTube",
    icon: <YouTubeIcon />,
    href: "#", // TODO: replace with YouTube channel URL
  },
];

const CONTACT_ITEMS = [
  {
    icon: <EmailOutlinedIcon fontSize="small" />,
    value: "info@armerotech.com",
    href: "mailto:info@armerotech.com",
  },
  {
    icon: <PhoneOutlinedIcon fontSize="small" />,
    value: "(630) 999-0000",
    href: "tel:6309990000",
  },
  {
    icon: <LocationOnOutlinedIcon fontSize="small" />,
    value: "Chicago, Illinois",
    href: null,
  },
];

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0a0a0a",
        borderTop: "3px solid",
        borderColor: "primary.main",
        pt: { xs: 6, md: 8 },
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 5, md: 4 }}>
          {/* ── Brand col ── */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              component={Link}
              to="/"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                mb: 2,
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                src={logoIcon}
                alt="Armero Technologies"
                sx={{ height: 52, width: "auto" }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 3, maxWidth: 280 }}
            >
              Defense support company delivering professional weapons
              maintenance, mobile ultrasonic cleaning, and armory solutions.
            </Typography>

            {/* Socials */}
            <Stack direction="row" spacing={0.5}>
              {SOCIALS.map(({ label, icon, href }) => (
                <IconButton
                  key={label}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  size="small"
                  sx={{
                    color: "text.secondary",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "6px",
                    "&:hover": {
                      color: "primary.main",
                      borderColor: "primary.main",
                      bgcolor: "rgba(178,16,14,0.08)",
                    },
                  }}
                >
                  {icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* ── Quick links col ── */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                letterSpacing: "2px",
                display: "block",
                mb: 2,
              }}
            >
              Navigation
            </Typography>
            <Stack spacing={1.5}>
              {NAV_LINKS.map(({ label, path }) => (
                <Typography
                  key={path}
                  component={Link}
                  to={path}
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    textDecoration: "none",
                    transition: "color 0.15s",
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  {label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* ── Services col ── */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                letterSpacing: "2px",
                display: "block",
                mb: 2,
              }}
            >
              Services
            </Typography>
            <Stack spacing={1.5}>
              {[
                "Mobile Ultrasonic Cleaning",
                "Weapons Maintenance",
                "Armory Support Products",
                "Safety Training",
                "Gunsmithing Services",
              ].map((s) => (
                <Typography
                  key={s}
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                >
                  {s}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* ── Contact col ── */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                letterSpacing: "2px",
                display: "block",
                mb: 2,
              }}
            >
              Contact
            </Typography>
            <Stack spacing={2}>
              {CONTACT_ITEMS.map(({ icon, value, href }) => (
                <Box
                  key={value}
                  sx={{ display: "flex", gap: 1.5, alignItems: "center" }}
                >
                  <Box
                    sx={{
                      color: "text.secondary",
                      flexShrink: 0,
                      display: "flex",
                    }}
                  >
                    {icon}
                  </Box>
                  {href ? (
                    <Typography
                      component="a"
                      href={href}
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        textDecoration: "none",
                        "&:hover": { color: "primary.main" },
                      }}
                    >
                      {value}
                    </Typography>
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {value}
                    </Typography>
                  )}
                </Box>
              ))}
            </Stack>

            <Box
              sx={{
                mt: 3,
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "rgba(178,16,14,0.05)",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block" }}
              >
                <Box
                  component="span"
                  sx={{ color: "primary.main", fontWeight: 600 }}
                >
                  armerotech.com
                </Box>
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Veteran Owned · Mission Focused
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* ── Bottom bar ── */}
        <Divider sx={{ mt: { xs: 5, md: 6 }, mb: 3, borderColor: "divider" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 1,
          }}
        >
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            © {new Date().getFullYear()} ARMERO Technologies. All rights
            reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Precision · Integrity · Readiness
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
