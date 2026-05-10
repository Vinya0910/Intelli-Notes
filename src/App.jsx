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