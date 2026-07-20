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
import CircuitGrid from "../components/CircuitGrid";
import machineGun from "../assets/machine-gun.jpg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Data ────────────────────────────────────────────────────────────────────

const CAPABILITIES = [
  { text: "Mobile & On-Site Ultrasonic Weapons Cleaning" },
  { text: "Weapons Maintenance & Inspection Services" },
  { text: "Firearm Cleaning Supplies & Consumables" },
  { text: "Cotton Swabs for Weapons Maintenance", mobileHide: true },
  { text: "CLP & Armory Support Products" },
  { text: "Recycled Cotton Rags & Cleaning Materials", mobileHide: true },
  { text: "Sight Mounting & Adjustment Services" },
  { text: "Select Gunsmithing Services" },
  { text: "Shooting Glasses & Hearing Protection", mobileHide: true },
];

const DIFFERENTIATORS = [
  { icon: <MilitaryTechIcon />, label: "Disabled Veteran-Owned Business" },
  { icon: <ShieldIcon />, label: "Founded by a U.S. Marine Corps Armorer" },
  {
    icon: <GpsFixedIcon />,
    label: "Real-World Military Maintenance Experience",
  },
  {
    icon: <DirectionsCarIcon />,
    label: "Mobile Service — Tactical 4×4 Sprinter Van",
  },
  {
    icon: <BuildIcon />,
    label: "Focus on Weapons Safety & Operational Readiness",
    mobileHide: true,
  },
  {
    icon: <RecyclingIcon />,
    label: "Sustainable Carbon Recycling Program",
    mobileHide: true,
  },
  {
    icon: <GroupsIcon />,
    label: "Veteran Workforce Development Mission",
    mobileHide: true,
  },
  {
    icon: <SupportAgentIcon />,
    label: "Responsive Small Business Customer Support",
    mobileHide: true,
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
            backgroundImage: `url(${machineGun})`,
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
            <Box
              ref={heroContentRef}
              sx={{
                maxWidth: 680,
                mx: { xs: "auto", md: 0 },
                textAlign: { xs: "center", md: "left" },
              }}
            >
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
                Veteran-Owned Defense Support Company
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
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "stretch", sm: "flex-start" }}
              >
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
                          display: { xs: "none", sm: "block" },
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

          <Grid container spacing={2} justifyContent="center">
            {CAPABILITIES.map(({ text, mobileHide }) => (
              <Grid
                key={text}
                size={{ xs: 12, sm: 6, md: 4 }}
                sx={{
                  display: { xs: mobileHide ? "none" : "flex", md: "flex" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: { xs: "center", sm: "flex-start" },
                    flexDirection: { xs: "column", sm: "row" },
                    textAlign: { xs: "center", sm: "left" },
                    gap: 1.5,
                    p: 2.5,
                    borderRadius: "8px",
                    border: "1px solid",
                    borderColor: "divider",
                    width: "100%",
                    transition: "border-color 0.2s",
                    "&:hover": { borderColor: "primary.main" },
                  }}
                >
                  <CheckCircleIcon
                    sx={{ color: "primary.main", flexShrink: 0, fontSize: 20 }}
                  />
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    {text}
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

          <Grid container spacing={3} justifyContent="center">
            {DIFFERENTIATORS.map(({ icon, label, mobileHide }) => (
              <Grid
                key={label}
                size={{ xs: 6, sm: 6, md: 3 }}
                sx={{
                  display: { xs: mobileHide ? "none" : "flex", md: "flex" },
                }}
              >
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
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { xs: "fixed" },
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
          <Box
            sx={{
              maxWidth: 560,
              mx: { xs: "auto", md: 0 },
              textAlign: { xs: "center", md: "left" },
            }}
          >
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
              sx={{
                px: 4,
                py: 1.5,
                display: { xs: "none", sm: "inline-flex" },
              }}
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
          bgcolor: "background.paper",
          overflow: "hidden",
          //   borderTop: "3px solid",
          borderColor: "primary.main",
          py: { xs: 10, md: 16 },
          display: "flex",
          alignItems: "center",
        }}
      >
        <CircuitGrid
          nodeSpacing={80}
          pulseRate={3}
          redRatio={0.3}
          baseOpacity={0.06}
        />

        <Container
          maxWidth="md"
          sx={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              letterSpacing: "3px",
              display: "block",
              mb: 2,
            }}
          >
            Armero Technologies
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: "text.primary",
              lineHeight: 1,
              mb: 5,
              "& span": { display: "block" },
            }}
          >
            <span>Ready Today.</span>
            <span>Ready Tomorrow.</span>
            <Box component="span" sx={{ color: "primary.main" }}>
              Always Ready.
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", mb: 5, maxWidth: 480, mx: "auto" }}
          >
            Supporting Those Who Protect our Nation.
          </Typography>
          <Button
            component={Link}
            to="/contact"
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 6, py: 1.75, width: { xs: "100%", sm: "auto" } }}
          >
            Get in Touch
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
