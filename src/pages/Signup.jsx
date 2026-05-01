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

          <Typography variant="h4" align="center" gutterBottom sx={{ color: "white" }}>
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
            sx={{ mt: 2 }}
            onClick={handleSignup} 
          >
            Create Account
          </Button>

          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account?
            <span
              style={{ color: "#7dd3fc", cursor: "pointer", fontWeight: "bold" }}
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
