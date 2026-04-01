import { Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

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
          backgroundColor: "#1e1e1e",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.6)"
        }}
      >
        <CardContent>

          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Login
          </Typography>

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          {/* Login button navigation */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.2,
              fontWeight: "bold"
            }}
            onClick={() => navigate("/dashboard")}
          >
            Login
          </Button>

          {/* Signup navigation */}
          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <span
              style={{ color: "#3f8cff", cursor: "pointer", fontWeight: "bold" }}
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