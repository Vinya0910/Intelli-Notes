import { Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Login() {

  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
        p: 2,
        background:
          "radial-gradient(circle at 24% 16%, rgba(125,211,252,0.22), transparent 34%), linear-gradient(135deg,#07111f,#10283a 54%,#172033)"
      }}
    >
      <Card
        sx={{
          width: { xs: "90%", sm: 400 },
          p: 3,
          color: "white",
          backdropFilter: "blur(18px)"
        }}
      >
        <CardContent>

          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "white" }}
          >
            Login
          </Typography>

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // ✅ added
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
              mt: 2,
              py: 1.2,
              fontWeight: "bold"
            }}
            onClick={handleLogin} 
          >
            Login
          </Button>

          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <span
              style={{ color: "#7dd3fc", cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
