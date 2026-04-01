import Sidebar from "../components/Sidebar";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { useState, useEffect } from "react";

// FIREBASE IMPORTS
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function Notes() {

  const [notes, setNotes] = useState([]);

  // FETCH NOTES FROM FIREBASE
  useEffect(() => {

    const fetchNotes = async () => {

      const querySnapshot = await getDocs(collection(db, "notes"));

      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setNotes(data);

    };

    fetchNotes();

  }, []);

  // DELETE NOTE
  const handleDelete = async (id) => {

    try {

      await deleteDoc(doc(db, "notes", id));

      setNotes(notes.filter(note => note.id !== id));

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

      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >

        <Typography variant="h4" sx={{ color: "white", mb: 4 }}>
          All Notes
        </Typography>

        {notes.map((note) => (

          <Card
            key={note.id}
            sx={{
              width: "60%",
              mb: 3,
              background: "rgba(30,30,30,0.6)",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              color: "white"
            }}
          >

            <CardContent>

              <Typography variant="h6">
                {note.title}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "#ccc",
                  lineHeight: 1.6,
                  whiteSpace: "pre-line"
                }}
              >
                {note.content}
              </Typography>

              <Box sx={{ mt: 2 }}>

                <Button
                  variant="contained"
                  size="small"
                  sx={{ mr: 2 }}
                >
                  Edit
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(note.id)}
                >
                  Delete
                </Button>

              </Box>

            </CardContent>

          </Card>

        ))}

      </Box>

    </Box>

  );

}

export default Notes;