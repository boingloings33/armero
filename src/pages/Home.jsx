import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShieldIcon from "@mui/icons-material/Shield";
import BuildIcon from "@mui/icons-material/Build";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import RecyclingIcon from "@mui/icons-material/Recycling";
import GroupsIcon from "@mui/icons-material/Groups";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

import heroBg from "../assets/hero-bg.jpg";
import logoFull from "../assets/base-subtext.png";
import logoIcon from "../assets/base.png";
import mascotsImg from "../assets/mascots-image.jpg";
import vanInside from "../assets/van-inside.jpg";
import HexGrid from "../components/HexGrid";
import machineGun from "../assets/machine-gun.jpg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Data ────────────────────────────────────────────────────────────────────

const CAPABILITIES = [
  "Mobile & On-Site Ultrasonic Weapons Cleaning",
  "Weapons Maintenance & Inspection Services",
  "Firearm Cleaning Supplies & Consumables",
  "Cotton Swabs for Weapons Maintenance",
  "CLP & Armory Support Products",
  "Recycled Cotton Rags & Cleaning Materials",
  "Sight Mounting & Adjustment Services",
  "Select Gunsmithing Services",
  "Shooting Glasses & Hearing Protection",
];

const DIFFERENTIATORS = [
  { icon: <MilitaryTechIcon />, label: "Disabled Veteran-Owned Business" },
  { icon: <ShieldIcon />, label: "Founded by a U.S. Marine Corps Armorer" },
  {
    icon: <GpsFixedIcon />,
    label: "Real-World Military Weapons Maintenance Experience",
  },
  {
    icon: <DirectionsCarIcon />,
    label: "Mobile Service Capability — Tactical 4×4 Sprinter Van",
  },
  {
    icon: <BuildIcon />,
    label: "Focus on Weapons Safety & Operational Readiness",
  },
  { icon: <RecyclingIcon />, label: "Sustainable Carbon Recycling Program" },
  { icon: <GroupsIcon />, label: "Veteran Workforce Development Mission" },
  {
    icon: <SupportAgentIcon />,
    label: "Responsive Small Business Customer Support",
  },
];

// ─── Section wrapper ─────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <Typography
      variant="overline"
      sx={{
        color: "primary.main",
        letterSpacing: "2px",
        display: "block",
        mb: 1,
      }}
    >
      {children}
    </Typography>
  );
}

// ─── Home ────────────────────────────────────────────────────────────────────

function Home() {
  const heroSectionRef = useRef(null);
  const heroContentRef = useRef(null);

  // Pin the hero so subsequent sections slide up over it
  useEffect(() => {
    const heroSection = heroSectionRef.current;
    if (!heroSection) return;

    const headerEl = document.querySelector("header");
    const headerHeight = headerEl ? headerEl.offsetHeight : 0;

    const pinTrigger = ScrollTrigger.create({
      trigger: heroSection,
      start: `top top+=${headerHeight}`,
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      pinType: "fixed",
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });

    return () => {
      pinTrigger.kill(true);
    };
  }, []);

  // Hero content fade-in on mount
  useGSAP(() => {
    if (!heroContentRef.current) return;
    gsap.from(heroContentRef.current.children, {
      opacity: 0,
      y: 28,
      duration: 1,
      stagger: 0.18,
      ease: "power3.out",
      delay: 0.15,
    });
  }, []);

  return (
    <Box>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <Box>
        <Box
          component="section"
          ref={heroSectionRef}
          sx={{
            position: "relative",
            overflow: "hidden",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Dark gradient overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(10,10,10,0.92) 45%, rgba(10,10,10,0.5) 100%)",
            }}
          />

          <Container
            maxWidth="lg"
            sx={{ position: "relative", zIndex: 1, py: { xs: 12, md: 16 } }}
          >
            <Box ref={heroContentRef} sx={{ maxWidth: 680 }}>
              {/* Tag */}
              <Typography
                variant="overline"
                sx={{
                  color: "primary.main",
                  letterSpacing: "3px",
                  fontSize: "11px",
                  mb: 2,
                  display: "block",
                }}
              >
                Disabled Veteran-Owned Defense Support Company
              </Typography>

              {/* Headline */}
              <Typography
                variant="h1"
                sx={{ color: "text.primary", mb: 2, fontWeight: 700 }}
              >
                Keeper of the Sword
              </Typography>

              {/* Sub-headline */}
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  fontWeight: 400,
                  mb: 5,
                  maxWidth: 560,
                }}
              >
                Professional weapons maintenance solutions, mobile ultrasonic
                cleaning, and armory support. Built for those who protect.
              </Typography>

              {/* CTAs */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  component={Link}
                  to="/projects"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Our Services
                </Button>
                <Button
                  component={Link}
                  to="/contact"
                  variant="outlined"
                  color="inherit"
                  size="large"
                  sx={{ px: 4, py: 1.5, borderColor: "rgba(240,240,240,0.4)" }}
                >
                  Contact Us
                </Button>
              </Stack>
            </Box>
          </Container>

          {/* Bottom strip */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: "rgba(178,16,14,0.9)",
              py: 1.25,
              textAlign: "center",
            }}
          >
            <Typography
              variant="overline"
              sx={{ letterSpacing: "4px", color: "#fff", fontSize: "11px" }}
            >
              Weapons Readiness &nbsp;|&nbsp; Safety &nbsp;|&nbsp; Innovation
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ── COMPANY OVERVIEW ───────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          bgcolor: "background.default",
          borderTop: "3px solid",
          borderColor: "primary.main",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <SectionLabel>Company Overview</SectionLabel>
              <Typography variant="h2" sx={{ mb: 4, color: "text.primary" }}>
                Built by Warfighters.
                <br />
                Trusted by Professionals.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 3 }}
              >
                ARMERO Technologies, founded by a U.S. Marine Corps Armorer,
                delivers professional weapons maintenance solutions, mobile
                ultrasonic cleaning, armory support products, tactical
                equipment, and weapons safety innovation for military, law
                enforcement, government, and commercial customers.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 5 }}
              >
                We combine real-world operational experience with modern
                technology, a commitment to operational readiness,
                sustainability, and exceptional customer support.
              </Typography>

              <Stack direction="row" spacing={4} flexWrap="wrap" useFlexGap>
                {["Weapons Readiness", "Safety First", "Innovation"].map(
                  (val) => (
                    <Box key={val} sx={{ textAlign: "center" }}>
                      <Typography
                        variant="overline"
                        sx={{
                          color: "primary.main",
                          letterSpacing: "1.5px",
                          display: "block",
                        }}
                      >
                        {val}
                      </Typography>
                    </Box>
                  ),
                )}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }} sx={{ textAlign: "center" }}>
              <Box
                component="img"
                src={mascotsImg}
                alt="Armero logo"
                sx={{
                  width: "100%",
                  maxWidth: 1420,
                  opacity: 0.92,
                  filter: "drop-shadow(0 0 40px rgba(178,16,14,0.25))",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── CORE CAPABILITIES ──────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          bgcolor: "background.paper",
          py: { xs: 8, md: 12 },
        }}
      >
        {/* Animated hex grid sits behind content */}
        <HexGrid />
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <SectionLabel>What We Do</SectionLabel>
            <Typography variant="h2" sx={{ color: "text.primary" }}>
              Core Capabilities
            </Typography>
            <Divider
              sx={{
                width: 60,
                borderColor: "primary.main",
                borderWidth: 2,
                mx: "auto",
                mt: 3,
              }}
            />
          </Box>

          <Grid container spacing={2}>
            {CAPABILITIES.map((cap) => (
              <Grid key={cap} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.5,
                    p: 2.5,
                    borderRadius: "8px",
                    border: "1px solid",
                    borderColor: "divider",
                    height: "100%",
                    transition: "border-color 0.2s",
                    "&:hover": { borderColor: "primary.main" },
                  }}
                >
                  <CheckCircleIcon
                    sx={{
                      color: "primary.main",
                      mt: "2px",
                      flexShrink: 0,
                      fontSize: 20,
                    }}
                  />
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    {cap}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── DIFFERENTIATORS ────────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          bgcolor: "background.default",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <SectionLabel>Why Armero</SectionLabel>
            <Typography variant="h2" sx={{ color: "text.primary" }}>
              What Sets Us Apart
            </Typography>
            <Divider
              sx={{
                width: 60,
                borderColor: "primary.main",
                borderWidth: 2,
                mx: "auto",
                mt: 3,
              }}
            />
          </Box>

          <Grid container spacing={3}>
            {DIFFERENTIATORS.map(({ icon, label }) => (
              <Grid key={label} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box
                  sx={{
                    textAlign: "center",
                    p: 3,
                    borderRadius: "8px",
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    transition: "border-color 0.2s, transform 0.2s",
                    "&:hover": {
                      borderColor: "primary.main",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      bgcolor: "rgba(178,16,14,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "primary.main",
                      "& svg": { fontSize: 26 },
                    }}
                  >
                    {icon}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.primary", textAlign: "center" }}
                  >
                    {label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── MOBILE UNIT FEATURE ────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: { xs: 360, md: 480 },
          display: "flex",
          alignItems: "center",
          backgroundImage: `url(${machineGun})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { md: "fixed" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(10,10,10,0.78)",
          }}
        />
        <Container
          maxWidth="lg"
          sx={{ position: "relative", zIndex: 1, py: { xs: 8, md: 10 } }}
        >
          <Box sx={{ maxWidth: 560 }}>
            <SectionLabel>Mobile Capability</SectionLabel>
            <Typography variant="h2" sx={{ color: "text.primary", mb: 3 }}>
              Service Comes to You
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 5 }}>
              Our tactical 4×4 Sprinter Van brings a full ultrasonic weapons
              cleaning unit directly to your range, base, or facility — ensuring
              operational readiness without disrupting your mission.
            </Typography>
            <Button
              component={Link}
              to="/about"
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ── READY BANNER ───────────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          bgcolor: "#0d0d0d",
          overflow: "hidden",
          py: { xs: 6, md: 8 },
          textAlign: "center",
        }}
      >
        {/* Animated hex grid sits behind content */}
        <HexGrid />

        {/* Subtle red vignette from center */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(178,16,14,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h3"
            sx={{
              color: "text.primary",
              fontWeight: 700,
              letterSpacing: "1px",
              mb: 2,
            }}
          >
            Ready Today. Ready Tomorrow. Always Ready.
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            Veteran Owned. Mission Focused. Supporting Those Who Protect.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              component={Link}
              to="/contact"
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              Get in Touch
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
