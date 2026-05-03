import Sidebar from "../components/Sidebar";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { useState, useEffect } from "react";

// FIREBASE IMPORTS
import { collection, getDocs, deleteDoc, doc,query,where } from "firebase/firestore";
import { db,auth } from "../firebase/firebase";

function Notes() {

  const [notes, setNotes] = useState([]);

  // FETCH NOTES FROM FIREBASE
  useEffect(() => {

    const fetchNotes = async () => {

     if (!auth.currentUser) return;
     const q =query(
     collection(db,"notes"),
     where("userId", "==",auth.currentUser.uid)
     );
     const querySnapshot = await getDocs(q);

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
        background:
          "radial-gradient(circle at 82% 18%, rgba(196,181,253,0.16), transparent 30%), linear-gradient(135deg,#07111f,#10283a 54%,#172033)"
      }}
    >

      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
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
          width: { xs: "100%", md: "72%", lg: "60%" },
          mb: 3,
          color: "white",
          backdropFilter: "blur(18px)",
          transition: "transform 0.2s ease, border-color 0.2s ease",
          "&:hover": {
            transform: "translateY(-3px)",
            borderColor: "rgba(125, 211, 252, 0.38)"
          }
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
