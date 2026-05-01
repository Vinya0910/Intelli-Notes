import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Notes", to: "/notes" },
  { label: "Create", to: "/create-note" },
  { label: "Settings", to: "/settings" }
];

function Sidebar() {
  return (
    <Box
      component="aside"
      sx={{
        width: { xs: 88, sm: 220 },
        flexShrink: 0,
        px: { xs: 1.25, sm: 2 },
        py: 3,
        borderRight: "1px solid rgba(148, 163, 184, 0.18)",
        background: "rgba(4, 12, 24, 0.72)",
        backdropFilter: "blur(18px)",
        display: "flex",
        flexDirection: "column",
        gap: 3
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            lineHeight: 1,
            display: { xs: "none", sm: "block" }
          }}
        >
          Smart Notes
        </Typography>
        <Typography
          sx={{
            mt: 0.75,
            color: "text.secondary",
            fontSize: 12,
            display: { xs: "none", sm: "block" }
          }}
        >
          AI workspace
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            textAlign: "center",
            display: { xs: "block", sm: "none" }
          }}
        >
          SN
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {navItems.map((item) => (
          <Button
            key={item.to}
            component={NavLink}
            to={item.to}
            sx={{
              justifyContent: { xs: "center", sm: "flex-start" },
              px: { xs: 1, sm: 1.5 },
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
            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
              {item.label}
            </Box>
            <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
              {item.label.slice(0, 1)}
            </Box>
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default Sidebar;
