import Sidebar from "../components/Sidebar";
import { Box, Typography, Card, CardContent, TextField, Button } from "@mui/material";
import { useState } from "react";

// NEW IMPORTS
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

function CreateNote() {

  // STATE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  // SAVE NOTE FUNCTION
  const handleSaveNote = async () => {

    try {

      await addDoc(collection(db, "notes"), {
        title: title,
        content: description
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
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)"
      }}
    >

      {/* Sidebar */}
      <Sidebar />

      <Box sx={{ flexGrow: 1, p: 4, display: "flex", justifyContent: "center" }}>

        <Card
          sx={{
            width: "60%",
            background: "rgba(30,30,30,0.6)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            color: "white"
          }}
        >

          <CardContent>

            <Typography variant="h4" sx={{ mb: 3 }}>
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
              sx={{ mb: 5 }}
            />

            {/* Save Button */}
            <Button
              variant="contained"
              sx={{ mt: 2 }}
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