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
        px: { xs: 1.5, md: 2 },
        py: { xs: 1.5, md: 3 },
        borderRight: { xs: 0, md: "1px solid rgba(148, 163, 184, 0.18)" },
        borderBottom: { xs: "1px solid rgba(148, 163, 184, 0.18)", md: 0 },
        background: "rgba(4, 12, 24, 0.72)",
        backdropFilter: "blur(18px)",
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
            color: "white",
            lineHeight: 1,
            display: { xs: "none", md: "block" }
          }}
        >
          Smart Notes
        </Typography>
        <Typography
          sx={{
            mt: 0.75,
            color: "text.secondary",
            fontSize: 12,
            display: { xs: "none", md: "block" }
          }}
        >
          AI workspace
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            textAlign: "center",
            display: { xs: "block", md: "none" },
            fontSize: { xs: 18, sm: 20 }
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
          pb: { xs: 0.5, md: 0 },
          scrollbarWidth: "thin"
        }}
      >
        {navItems.map((item) => (
          <Button
            key={item.to}
            component={NavLink}
            to={item.to}
            sx={{
              justifyContent: { xs: "center", md: "flex-start" },
              px: { xs: 1.25, md: 1.5 },
              minWidth: { xs: "max-content", md: 64 },
              whiteSpace: "nowrap",
              color: "text.secondary",
              "&.active": {
                color: "primary.contrastText",
                background: "linear-gradient(135deg, #7dd3fc 0%, #a5b4fc 100%)"
              },
              "&:hover": {
                color: "white",
                backgroundColor: "rgba(148, 163, 184, 0.12)"
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
