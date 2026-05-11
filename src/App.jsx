import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { signOut } from "firebase/auth";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import Settings from "./pages/Settings";
import AIAssistant from "./pages/AIAssistant";
import PinnedNotes from "./pages/PinnedNotes";

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LIGHT MODE STATE
  const [lightMode, setLightMode] = useState(false);

  // THEME
  const theme = createTheme({
    palette: {
      mode: lightMode ? "light" : "dark",
      primary: {
        main: "#7dd3fc",
        contrastText: "#07111f",
      },
      secondary: {
        main: "#a5b4fc",
      },
      background: {
        default: lightMode ? "#f4f7fb" : "#07111f",
        paper: lightMode ? "#ffffff" : "rgba(15, 23, 42, 0.78)",
      },
      text: {
        primary: lightMode ? "#111827" : "#f8fafc",
        secondary: lightMode ? "#64748b" : "#a8b3c7",
      },
    },
    typography: {
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      h3: {
        fontWeight: 800,
        letterSpacing: 0,
      },
      h4: {
        fontWeight: 800,
        letterSpacing: 0,
      },
      h6: {
        fontWeight: 700,
      },
      button: {
        fontWeight: 800,
        letterSpacing: 0,
        textTransform: "none",
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: lightMode
              ? "linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(241, 245, 249, 0.92))"
              : "linear-gradient(145deg, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.72))",
            border: lightMode
              ? "1px solid rgba(148, 163, 184, 0.22)"
              : "1px solid rgba(148, 163, 184, 0.18)",
            boxShadow: lightMode
              ? "0 24px 60px rgba(15, 23, 42, 0.1)"
              : "0 24px 70px rgba(2, 6, 23, 0.34)",
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: "28px",
            "&:last-child": {
              paddingBottom: "28px",
            },
            "@media (max-width: 600px)": {
              padding: "20px",
              "&:last-child": {
                paddingBottom: "20px",
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            minHeight: 42,
            boxShadow: "none",
          },
          containedPrimary: {
            background: "linear-gradient(135deg, #7dd3fc 0%, #a5b4fc 100%)",
            "&:hover": {
              boxShadow: "0 14px 34px rgba(125, 211, 252, 0.24)",
            },
          },
          outlined: {
            borderColor: lightMode
              ? "rgba(15, 23, 42, 0.22)"
              : "rgba(226, 232, 240, 0.28)",
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
        },
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              background: lightMode
                ? "rgba(255, 255, 255, 0.88)"
                : "rgba(15, 23, 42, 0.62)",
              borderRadius: 8,
              "& fieldset": {
                borderColor: lightMode
                  ? "rgba(148, 163, 184, 0.36)"
                  : "rgba(148, 163, 184, 0.26)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(125, 211, 252, 0.58)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#7dd3fc",
              },
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            background: lightMode
              ? "rgba(255, 255, 255, 0.88)"
              : "rgba(15, 23, 42, 0.62)",
          },
        },
      },
    },
  });

  useEffect(() => {

    signOut(auth);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();

  }, []);

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<Navigate to={user ? "/dashboard" : "/login"} />}
          />

          {/* Public Routes */}
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />

          <Route
            path="/signup"
            element={user ? <Navigate to="/dashboard" /> : <Signup />}
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route
            path="/notes"
            element={user ? <Notes /> : <Navigate to="/login" />}
          />

          <Route
            path="/create-note"
            element={user ? <CreateNote /> : <Navigate to="/login" />}
          />

          <Route
            path="/settings"
            element={
              user ? (
                <Settings
                  lightMode={lightMode}
                  setLightMode={setLightMode}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/ai-assistant"
            element={user ? <AIAssistant /> : <Navigate to="/login" />}
          />

          <Route
            path="/pinned-notes"
            element={user ? <PinnedNotes /> : <Navigate to="/login" />}
          />

        </Routes>

      </BrowserRouter>

    </ThemeProvider>

  );
}

export default App;
