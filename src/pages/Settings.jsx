import Sidebar from "../components/Sidebar";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Switch
} from "@mui/material";

import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

import { useNavigate } from "react-router-dom";

function Settings({ lightMode, setLightMode }) {

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
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        background:
          lightMode
            ? "#f4f7fb"
            : "radial-gradient(circle at 82% 18%, rgba(196,181,253,0.16), transparent 30%), linear-gradient(135deg,#07111f,#10283a 54%,#172033)"
      }}
    >

      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          display: "flex",
          justifyContent: "center",
          minWidth: 0
        }}
      >

        <Card
          sx={{
            width: { xs: "100%", md: "52%", lg: "40%" },
            alignSelf: "flex-start",

            color: lightMode ? "#111" : "white",

            backdropFilter: "blur(18px)",

            background: lightMode
              ? "white"
              : "rgba(15,23,42,0.7)"
          }}
        >

          <CardContent>

            <Typography variant="h4" sx={{ mb: 3, fontSize: { xs: 28, md: 34 } }}>
              Settings
            </Typography>

            <Typography sx={{ mb: 2 }}>
              Light Mode
            </Typography>

            <Switch
              checked={lightMode}
              onChange={() => setLightMode(!lightMode)}
            />

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
