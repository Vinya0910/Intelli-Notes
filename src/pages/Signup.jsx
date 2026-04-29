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
        background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)"
      }}
    >

      <Card
        sx={{
          width: { xs: "90%", sm: 400 },
          p: 3,
          borderRadius: 3,
          backgroundColor: "#1e1e1e"
        }}
      >

        <CardContent>

          <Typography variant="h4" align="center" gutterBottom>
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
              style={{ color: "#3f8cff", cursor: "pointer" }}
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