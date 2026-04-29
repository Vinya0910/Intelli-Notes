import Sidebar from "../components/Sidebar";
import { Box, Typography, Card, CardContent, Button, Switch } from "@mui/material";
import { signOut } from "firebase/auth"; 
import { auth } from "../firebase/firebase"; 
import { useNavigate } from "react-router-dom"; 

function Settings() {

  const navigate = useNavigate(); 

 
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); 
    } catch (error) {
      alert(error.message);
    }
  };

  return (

    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)"
      }}
    >

      <Sidebar />

      <Box sx={{ flexGrow: 1, p: 4, display: "flex", justifyContent: "center" }}>

        <Card
          sx={{
            width: "40%",
            background: "rgba(30,30,30,0.6)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            color: "white"
          }}
        >

          <CardContent>

            <Typography variant="h4" sx={{ mb: 3 }}>
              Settings
            </Typography>

            <Typography sx={{ mb: 2 }}>
              Dark Mode
            </Typography>

            <Switch />

            <Typography sx={{ mt: 4, mb: 2 }}>
              Logout
            </Typography>

            <Button 
              variant="contained" 
              color="error"
              onClick={handleLogout} 
            >
              Logout
            </Button>

          </CardContent>

        </Card>

      </Box>

    </Box>

  );

}

export default Settings;