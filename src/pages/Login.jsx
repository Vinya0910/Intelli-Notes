import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";

import { auth } from "../firebase/firebase";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // FORGOT PASSWORD STATES
  const [openForgot, setOpenForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleLogin = async () => {

    try {

      await signInWithEmailAndPassword(auth, email, password);

      navigate("/dashboard");

    } catch (error) {

      alert(error.message);

    }

  };

  // FORGOT PASSWORD
  const handleForgotPassword = async () => {

    if (!resetEmail) {
      alert("Please enter your email");
      return;
    }

    try {

      await sendPasswordResetEmail(auth, resetEmail);

      alert("Password reset email sent!");

      setOpenForgot(false);

      setResetEmail("");

    } catch (error) {

      console.log(error);

      alert(error.message);

    }

  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: { xs: 2, sm: 3 },

        background:
          "radial-gradient(circle at 20% 12%, rgba(125,211,252,0.24), transparent 32%), radial-gradient(circle at 84% 16%, rgba(165,180,252,0.18), transparent 30%), linear-gradient(135deg,#07111f,#10283a 54%,#172033)"
      }}
    >

      <Card
        sx={{
          width: "100%",
          maxWidth: 430,
          p: { xs: 1, sm: 2 },
          color: "white",
          backdropFilter: "blur(22px)"
        }}
      >

        <CardContent>

          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "white",
              fontSize: { xs: 30, sm: 34 }
            }}
          >
            Login
          </Typography>

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2.5,
              py: 1.2,
              fontWeight: "bold"
            }}
            onClick={handleLogin}
          >
            Login
          </Button>

          {/* FORGOT PASSWORD */}
          <Typography
            align="center"
            onClick={() => setOpenForgot(true)}
            sx={{
              mt: 2,
              color: "#7dd3fc",
              cursor: "pointer",
              fontWeight: "bold",
              width: "fit-content",
              mx: "auto"
            }}
          >
            Forgot Password?
          </Typography>

          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}

            <span
              style={{
                color: "#7dd3fc",
                cursor: "pointer",
                fontWeight: "bold"
              }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>

          </Typography>

        </CardContent>

      </Card>

      {/* FORGOT PASSWORD DIALOG */}
      <Dialog
        open={openForgot}
        onClose={() => setOpenForgot(false)}
      >

        <DialogTitle>
          Reset Password
        </DialogTitle>

        <DialogContent>

          <TextField
            label="Enter your email"
            fullWidth
            margin="normal"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />

        </DialogContent>

        <DialogActions>

          <Button onClick={() => setOpenForgot(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleForgotPassword}
          >
            Send Link
          </Button>

        </DialogActions>

      </Dialog>

    </Box>

  );

}

export default Login;
