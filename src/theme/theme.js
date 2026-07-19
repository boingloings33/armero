// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

// ─── Font families ───────────────────────────────────────────────────────────
const POPPINS = '"Poppins", system-ui, -apple-system, sans-serif';
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
    // Headings — Poppins
    h1: {
      fontFamily: POPPINS,
      fontWeight: 700,
      fontSize: "clamp(40px, 6vw, 64px)",
      lineHeight: 1.15,
    },
    h2: {
      fontFamily: POPPINS,
      fontWeight: 700,
      fontSize: "clamp(30px, 4.5vw, 48px)",
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: POPPINS,
      fontWeight: 600,
      fontSize: "clamp(22px, 3vw, 32px)",
      lineHeight: 1.25,
    },
    h4: {
      fontFamily: POPPINS,
      fontWeight: 600,
      fontSize: "24px",
      lineHeight: 1.3,
    },
    h5: {
      fontFamily: POPPINS,
      fontWeight: 600,
      fontSize: "20px",
      lineHeight: 1.3,
    },
    h6: {
      fontFamily: POPPINS,
      fontWeight: 600,
      fontSize: "18px",
      lineHeight: 1.35,
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
