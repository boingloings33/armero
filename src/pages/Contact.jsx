import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Alert,
  Stack,
  Divider,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HexGrid from "../components/HexGrid";

// ─── Contact info ─────────────────────────────────────────────────────────────

const INFO_ITEMS = [
  {
    icon: <EmailOutlinedIcon />,
    label: "Email",
    value: "info@armerotech.com",
    href: "mailto:info@armerotech.com",
  },
  {
    icon: <PhoneOutlinedIcon />,
    label: "Phone",
    value: "(630) 999-0000",
    href: "tel:6309990000",
  },
  {
    icon: <LocationOnOutlinedIcon />,
    label: "Location",
    value: "Chicago, Illinois",
    href: null,
  },
  {
    icon: <DirectionsCarIcon />,
    label: "Mobile Service",
    value: "We come to you. Ranges, bases & facilities nationwide.",
    href: null,
  },
];

const INQUIRY_TYPES = [
  "General Inquiry",
  "Mobile Service Request",
  "Product / Supply Order",
  "Wholesale & Government",
  "Weapons Safety Training",
  "Employment Opportunities",
  "Other",
];

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      inquiryType: "",
      message: "",
    },
  });

  // ── TODO: replace with EmailJS (or chosen provider) once account is set up ──
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // TODO: initialise EmailJS at app root → emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
      // TODO: await emailjs.send(
      //   import.meta.env.VITE_EMAILJS_SERVICE_ID,
      //   import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      //   {
      //     from_name:    data.name,
      //     from_email:   data.email,
      //     phone:        data.phone,
      //     inquiry_type: data.inquiryType,
      //     message:      data.message,
      //     to_email:     "info@armerotech.com",
      //   }
      // );

      // Placeholder success for now
      await new Promise((r) => setTimeout(r, 800));
      console.log("Form data (placeholder):", data);

      setSubmitStatus({
        type: "success",
        message: "Message received! We'll be in touch shortly.",
      });
      reset();
    } catch (err) {
      console.error("Submit error:", err);
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          bgcolor: "#0d0d0d",
          overflow: "hidden",
          py: { xs: 10, md: 14 },
          textAlign: "center",
          borderBottom: "3px solid",
          borderColor: "primary.main",
        }}
      >
        <HexGrid hexSize={40} redChance={0.004} baseOpacityMax={0.07} />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(178,16,14,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              letterSpacing: "3px",
              display: "block",
              mb: 1,
            }}
          >
            Armero Technologies
          </Typography>
          <Typography variant="h1" sx={{ color: "text.primary", mb: 2 }}>
            Get in Touch
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", maxWidth: 520, mx: "auto" }}
          >
            Whether you need mobile weapons cleaning, armory support products,
            or want to discuss a service contract — we're ready to respond.
          </Typography>
        </Container>
      </Box>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
      <Box sx={{ bgcolor: "background.default", py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
            {/* ── LEFT: Info ───────────────────────────────────────── */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                variant="overline"
                sx={{
                  color: "primary.main",
                  letterSpacing: "2px",
                  display: "block",
                  mb: 1,
                }}
              >
                Contact Info
              </Typography>
              <Typography variant="h4" sx={{ color: "text.primary", mb: 4 }}>
                We're Ready When You Are
              </Typography>

              <Stack spacing={3}>
                {INFO_ITEMS.map(({ icon, label, value, href }) => (
                  <Box
                    key={label}
                    sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
                  >
                    <Box
                      sx={{
                        mt: "2px",
                        flexShrink: 0,
                        color: "primary.main",
                        "& svg": { fontSize: 22 },
                      }}
                    >
                      {icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="overline"
                        sx={{
                          color: "text.secondary",
                          display: "block",
                          lineHeight: 1.4,
                        }}
                      >
                        {label}
                      </Typography>
                      {href ? (
                        <Typography
                          component="a"
                          href={href}
                          variant="body2"
                          sx={{
                            color: "text.primary",
                            textDecoration: "none",
                            "&:hover": { color: "primary.main" },
                          }}
                        >
                          {value}
                        </Typography>
                      ) : (
                        <Typography
                          variant="body2"
                          sx={{ color: "text.primary" }}
                        >
                          {value}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 4, borderColor: "divider" }} />

              <Box
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: "primary.main",
                  //   borderLeft: "3px solid",
                  bgcolor: "rgba(178,16,14,0.05)",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ color: "primary.main", mb: 1 }}
                >
                  Government & Bulk Inquiries
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  SAM Registration and CAGE Code pending. Contact us directly
                  for capability statements, past performance records, or
                  procurement discussions.
                </Typography>
              </Box>
            </Grid>

            {/* ── RIGHT: Form ──────────────────────────────────────── */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  p: { xs: 3, md: 5 },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: "text.primary", mb: 0.5 }}
                >
                  Send a Message
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 4 }}
                >
                  Fill out the form and we'll get back to you within one
                  business day.
                </Typography>

                {submitStatus && (
                  <Alert severity={submitStatus.type} sx={{ mb: 3 }}>
                    {submitStatus.message}
                  </Alert>
                )}

                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  <Grid container spacing={2.5}>
                    {/* Name */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Controller
                        name="name"
                        control={control}
                        rules={{
                          required: "Name is required",
                          minLength: {
                            value: 2,
                            message: "At least 2 characters",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Full Name"
                            fullWidth
                            required
                            error={!!errors.name}
                            helperText={errors.name?.message}
                          />
                        )}
                      />
                    </Grid>

                    {/* Email */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Email Address"
                            type="email"
                            fullWidth
                            required
                            error={!!errors.email}
                            helperText={errors.email?.message}
                          />
                        )}
                      />
                    </Grid>

                    {/* Phone */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Phone Number (optional)"
                            fullWidth
                          />
                        )}
                      />
                    </Grid>

                    {/* Inquiry Type */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Controller
                        name="inquiryType"
                        control={control}
                        rules={{ required: "Please select an inquiry type" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            label="Inquiry Type"
                            fullWidth
                            required
                            error={!!errors.inquiryType}
                            helperText={errors.inquiryType?.message}
                          >
                            {INQUIRY_TYPES.map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>

                    {/* Message */}
                    <Grid size={{ xs: 12 }}>
                      <Controller
                        name="message"
                        control={control}
                        rules={{
                          required: "Message is required",
                          minLength: {
                            value: 10,
                            message: "Please provide a bit more detail",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Message"
                            fullWidth
                            required
                            multiline
                            rows={5}
                            error={!!errors.message}
                            helperText={errors.message?.message}
                          />
                        )}
                      />
                    </Grid>

                    {/* Submit */}
                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={isSubmitting}
                        sx={{ px: 5, py: 1.5 }}
                      >
                        {isSubmitting ? "Sending…" : "Send Message"}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Contact;
