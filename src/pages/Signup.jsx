import { Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Signup() {

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
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
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