import { Drawer, List, ListItemButton, ListItemText, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 220;

function Sidebar() {

  const navigate = useNavigate();

  return (

    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: "#1e1e1e",
          color: "white",
          borderRight: "none",
          paddingTop: 2
        }
      }}
    >

      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h6">AI Notes</Typography>
      </Box>

      <List>

        <ListItemButton onClick={() => navigate("/dashboard")}>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/notes")}>
          <ListItemText primary="Notes" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/create-note")}>
          <ListItemText primary="Create Note" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/settings")}>
          <ListItemText primary="Settings" />
        </ListItemButton>

      </List>

    </Drawer>

  );

}

export default Sidebar;