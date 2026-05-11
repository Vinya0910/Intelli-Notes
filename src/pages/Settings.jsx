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
            ? "radial-gradient(circle at 16% 10%, rgba(14,165,233,0.14), transparent 30%), radial-gradient(circle at 82% 18%, rgba(79,70,229,0.1), transparent 30%), linear-gradient(135deg,#f8fafc,#eaf4ff 54%,#f4f7fb)"
            : "radial-gradient(circle at 16% 10%, rgba(125,211,252,0.14), transparent 30%), radial-gradient(circle at 82% 18%, rgba(196,181,253,0.16), transparent 30%), linear-gradient(135deg,#07111f,#10283a 54%,#172033)",
        overflowX: "hidden"
      }}
    >

      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          display: "flex",
          justifyContent: "center",
          minWidth: 0
        }}
      >

        <Card
          sx={{
            width: "100%",
            maxWidth: 560,
            alignSelf: "flex-start",

            color: "text.primary",

            backdropFilter: "blur(18px)",

            background: lightMode
              ? "rgba(255,255,255,0.92)"
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

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                p: 2,
                borderRadius: 2,
                border: lightMode
                  ? "1px solid rgba(15, 23, 42, 0.1)"
                  : "1px solid rgba(148, 163, 184, 0.18)",
                background: lightMode
                  ? "rgba(241, 245, 249, 0.72)"
                  : "rgba(255,255,255,0.04)"
              }}
            >
              <Typography sx={{ mb: 0 }}>
                Theme preference
              </Typography>

              <Switch
                checked={lightMode}
                onChange={() => setLightMode(!lightMode)}
              />
            </Box>

            <Typography sx={{ mt: 4, mb: 2 }}>
              Logout
            </Typography>

            <Button
              variant="contained"
              color="error"
              sx={{ minWidth: { xs: "100%", sm: 120 } }}
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
