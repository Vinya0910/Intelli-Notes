import { Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Signup() {

  const navigate = useNavigate();

 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      navigate("/dashboard"); 
    } catch (error) {
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
        background: (theme) => theme.palette.mode === "light"
          ? "radial-gradient(circle at 20% 12%, rgba(100,116,139,0.12), transparent 32%), radial-gradient(circle at 84% 16%, rgba(63,100,120,0.08), transparent 30%), linear-gradient(135deg,#eef2f6,#e8eef4 54%,#f3f6f9)"
          : "radial-gradient(circle at 20% 12%, rgba(125,211,252,0.24), transparent 32%), radial-gradient(circle at 84% 16%, rgba(165,180,252,0.18), transparent 30%), linear-gradient(135deg,#07111f,#10283a 54%,#172033)"
      }}
    >

      <Card
        sx={{
          width: "100%",
          maxWidth: 430,
          p: { xs: 1, sm: 2 },
          color: "text.primary",
          backdropFilter: "blur(22px)"
        }}
      >

        <CardContent>

          <Typography variant="h4" align="center" gutterBottom sx={{ color: "text.primary", fontSize: { xs: 30, sm: 34 }, fontWeight: "bold" }}>
            Sign Up
          </Typography>

          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)} 
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2.5, py: 1.2 }}
            onClick={handleSignup} 
          >
            Create Account
          </Button>

          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account?
            <span
              style={{ color: "#3f6478", cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigate("/login")}
            >
              {" "}Login
            </span>
          </Typography>

        </CardContent>

      </Card>

    </Box>

  );
}

export default Signup;
