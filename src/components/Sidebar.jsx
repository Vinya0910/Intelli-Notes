import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Notes", to: "/notes" },
  { label: "Create", to: "/create-note" },
  { label: "Settings", to: "/settings" },
  {label: "AI Assistant",to:"/ai-assistant"},
  {label: "Pinned Notes",to: "/pinned-notes"}
];

function Sidebar() {
  return (
    <Box
      component="aside"
      sx={{
        width: { xs: "100%", md: 220 },
        flexShrink: 0,
        px: { xs: 1.25, md: 2 },
        py: { xs: 1.25, md: 3 },
        borderRight: {
          xs: 0,
          md: (theme) => theme.palette.mode === "light"
            ? "1px solid rgba(148, 163, 184, 0.24)"
            : "1px solid rgba(148, 163, 184, 0.18)"
        },
        borderBottom: {
          xs: (theme) => theme.palette.mode === "light"
            ? "1px solid rgba(148, 163, 184, 0.24)"
            : "1px solid rgba(148, 163, 184, 0.18)",
          md: 0
        },
        background: (theme) => theme.palette.mode === "light"
          ? "rgba(255, 255, 255, 0.86)"
          : "rgba(4, 12, 24, 0.82)",
        backdropFilter: "blur(22px)",
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        alignItems: { xs: "center", md: "stretch" },
        gap: { xs: 1.5, md: 3 },
        position: "sticky",
        top: 0,
        zIndex: 10
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <Typography
          variant="h6"
          sx={{
            color: "text.primary",
            lineHeight: 1,
            display: { xs: "none", md: "block" },
            fontWeight: 800
          }}
        >
          Smart Notes
        </Typography>
        <Typography
          sx={{
            mt: 0.75,
            color: "text.secondary",
            fontSize: 12,
            display: { xs: "none", md: "block" },
            letterSpacing: 0
          }}
        >
          AI workspace
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "text.primary",
            textAlign: "center",
            display: { xs: "block", md: "none" },
            fontSize: { xs: 18, sm: 20 },
            fontWeight: 800,
            minWidth: 42
          }}
        >
          SN
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          gap: 1,
          overflowX: { xs: "auto", md: "visible" },
          flexGrow: 1,
          pb: { xs: 0.25, md: 0 },
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none"
          }
        }}
      >
        {navItems.map((item) => (
          <Button
            key={item.to}
            component={NavLink}
            to={item.to}
            sx={{
              justifyContent: { xs: "center", md: "flex-start" },
              px: { xs: 1.5, md: 1.5 },
              py: { xs: 0.85, md: 1 },
              minWidth: { xs: "max-content", md: 64 },
              whiteSpace: "nowrap",
              border: "1px solid transparent",
              color: "text.secondary",
              fontSize: { xs: 13, md: 14 },
              "&.active": {
                color: "#ffffff",
                background: (theme) => theme.palette.mode === "light"
                  ? "linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)"
                  : "linear-gradient(135deg, #7dd3fc 0%, #a5b4fc 100%)",
                boxShadow: "0 14px 28px rgba(125, 211, 252, 0.18)"
              },
              "&:hover": {
                color: "text.primary",
                backgroundColor: (theme) => theme.palette.mode === "light"
                  ? "rgba(14, 165, 233, 0.08)"
                  : "rgba(148, 163, 184, 0.12)",
                borderColor: "rgba(148, 163, 184, 0.18)"
              }
            }}
          >
            <Box component="span" sx={{ display: "inline" }}>
              {item.label}
            </Box>
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default Sidebar;
