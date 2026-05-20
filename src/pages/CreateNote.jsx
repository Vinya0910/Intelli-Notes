import Sidebar from "../components/Sidebar";
import { Box, Typography, Card, CardContent, TextField, Button } from "@mui/material";
import { useState } from "react";
import { auth } from "../firebase/firebase";

// NEW IMPORTS
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

function CreateNote() {

  // STATE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  // SPEECH RECOGNITION
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.lang = "en-US";

  // START VOICE RECORDING
  const startListening = () => {

    recognition.start();

    recognition.onresult = (event) => {

      const transcript =
        event.results[0][0].transcript;

      setDescription((prev) => prev + " " + transcript);

    };

  };

  // SAVE NOTE FUNCTION
  const handleSaveNote = async () => {

    if (!title || !description) {

      alert("please fill all fields");

      return;

    }

    try {

      await addDoc(collection(db, "notes"), {

        title,

        content: description,

        userId: auth.currentUser.uid,

        isPinned: false

      });

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",

        background: (theme) => theme.palette.mode === "light"
          ? "radial-gradient(circle at 16% 10%, rgba(100,116,139,0.12), transparent 30%), radial-gradient(circle at 82% 18%, rgba(63,100,120,0.08), transparent 30%), linear-gradient(135deg,#eef2f6,#e8eef4 54%,#f3f6f9)"
          : "radial-gradient(circle at 16% 10%, rgba(125,211,252,0.14), transparent 30%), radial-gradient(circle at 82% 18%, rgba(196,181,253,0.16), transparent 30%), linear-gradient(135deg,#07111f,#10283a 54%,#172033)",

        overflowX: "hidden"
      }}
    >

      {/* Sidebar */}
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
            maxWidth: 760,
            color: "text.primary",
            backdropFilter: "blur(22px)",
            alignSelf: "flex-start"
          }}
        >

          <CardContent>

            <Typography
              variant="h4"
              sx={{
                mb: 3,
                fontSize: { xs: 28, md: 34 }
              }}
            >
              Create New Note
            </Typography>

            {/* Title */}
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 3 }}
            />

            {/* Description */}
            <TextField
              label="Description"
              multiline
              minRows={8}
              maxRows={20}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 3 }}
            />

            {/* VOICE BUTTON */}
            <Button
              variant="outlined"
              sx={{
                mb: 3,
                color: "white",
                borderColor: "white"
              }}
              onClick={startListening}
            >
              🎤 Start Recording
            </Button>

            {/* Save Button */}
            <Button
              variant="contained"
              sx={{
                mt: 1,
                minWidth: { xs: "100%", sm: 150 }
              }}
              onClick={handleSaveNote}
            >
              Save Note
            </Button>

          </CardContent>

        </Card>

      </Box>

    </Box>

  );

}

export default CreateNote;
// functionality changed