import Sidebar from "../components/Sidebar";
import { Box, Typography, Card, CardContent, TextField, Button } from "@mui/material";
import { useState } from "react";
import {auth} from "../firebase/firebase";

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
 if(!title || !description){
alert("please fill all fields");
return;
}
    try {

      await addDoc(collection(db, "notes"), {
         title,
         content: description,
        userId: auth.currentUser.uid
        
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
        background:
          "radial-gradient(circle at 82% 18%, rgba(196,181,253,0.16), transparent 30%), linear-gradient(135deg,#07111f,#10283a 54%,#172033)"
      }}
    >

      {/* Sidebar */}
      <Sidebar />

      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, display: "flex", justifyContent: "center" }}>

        <Card
          sx={{
            width: { xs: "100%", md: "72%", lg: "60%" },
            color: "white",
            backdropFilter: "blur(18px)"
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
