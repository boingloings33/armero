import { Box, Typography, Divider } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 4,
        px: { xs: 2, md: 4 },
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Divider sx={{ mb: 2 }} />
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} Armero. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
