// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

// ─── Font families ───────────────────────────────────────────────────────────
// Barlow Condensed: rigid, tactical condensed face used widely in defense/firearms branding
const BARLOW_CONDENSED =
  '"Barlow Condensed", "Arial Narrow", system-ui, sans-serif';
const INTER =
  '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

// ─── Brand palette ───────────────────────────────────────────────────────────
const BRAND = {
  red: "#b2100e",
  bgDark: "#121212", // near-black background
  bgPaper: "#1c1c1c", // slightly lifted surface
  bgPaperAlt: "#242424", // card / elevated surface
  textLight: "#f0f0f0", // primary text on dark backgrounds
  textMid: "#a0a0a0", // secondary / muted text
  textDark: "#1e1e1e", // text for use on light surfaces
  divider: "rgba(240, 240, 240, 0.10)",
};

// ─── Theme ───────────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: BRAND.red,
      contrastText: BRAND.textLight,
    },

    background: {
      default: BRAND.bgDark,
      paper: BRAND.bgPaper,
    },

    text: {
      primary: BRAND.textLight,
      secondary: BRAND.textMid,
      dark: BRAND.textDark,
    },

    divider: BRAND.divider,
  },

  // ─── Typography ─────────────────────────────────────────────────────────
  typography: {
    // Headings — Barlow Condensed (rigid, tactical, condensed)
    h1: {
      fontFamily: BARLOW_CONDENSED,
      fontWeight: 700,
      fontSize: "clamp(48px, 7vw, 80px)",
      lineHeight: 1.05,
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
    h2: {
      fontFamily: BARLOW_CONDENSED,
      fontWeight: 700,
      fontSize: "clamp(34px, 5vw, 56px)",
      lineHeight: 1.1,
      letterSpacing: "0.5px",
      textTransform: "uppercase",
    },
    h3: {
      fontFamily: BARLOW_CONDENSED,
      fontWeight: 600,
      fontSize: "clamp(24px, 3.5vw, 36px)",
      lineHeight: 1.15,
      letterSpacing: "0.5px",
      textTransform: "uppercase",
    },
    h4: {
      fontFamily: BARLOW_CONDENSED,
      fontWeight: 600,
      fontSize: "28px",
      lineHeight: 1.2,
      letterSpacing: "0.3px",
    },
    h5: {
      fontFamily: BARLOW_CONDENSED,
      fontWeight: 600,
      fontSize: "22px",
      lineHeight: 1.25,
      letterSpacing: "0.3px",
    },
    h6: {
      fontFamily: BARLOW_CONDENSED,
      fontWeight: 600,
      fontSize: "18px",
      lineHeight: 1.3,
      letterSpacing: "0.2px",
    },

    // Body — Inter
    body1: {
      fontFamily: INTER,
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: 1.65,
    },
    body2: {
      fontFamily: INTER,
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: 1.6,
    },

    // Captions / labels
    subtitle1: {
      fontFamily: INTER,
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: 1.5,
      letterSpacing: "0.5px",
    },
    subtitle2: {
      fontFamily: INTER,
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: 1.5,
      letterSpacing: "0.4px",
    },
    caption: {
      fontFamily: INTER,
      fontWeight: 400,
      fontSize: "11px",
      lineHeight: 1.4,
      letterSpacing: "0.3px",
    },
    overline: {
      fontFamily: INTER,
      fontWeight: 600,
      fontSize: "11px",
      lineHeight: 1.4,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
    },

    // Buttons
    button: {
      fontFamily: INTER,
      fontWeight: 600,
      fontSize: "14px",
      letterSpacing: "0.5px",
      textTransform: "none",
    },
  },

  // ─── Component overrides ────────────────────────────────────────────────
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: BRAND.bgDark,
          color: BRAND.textLight,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: BRAND.bgDark,
          backgroundImage: "none",
          borderBottom: `1px solid ${BRAND.divider}`,
        },
      },
    },
  },
});

export default theme;
