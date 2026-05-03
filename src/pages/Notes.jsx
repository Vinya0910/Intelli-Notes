import Sidebar from "../components/Sidebar";
import { Box, Typography, Card, CardContent, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";

// FIREBASE IMPORTS
import { collection, getDocs, deleteDoc, doc, query, where, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

function Notes() {

  const [notes, setNotes] = useState([]);

 
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");


  useEffect(() => {

    const fetchNotes = async () => {

      if (!auth.currentUser) return;

      const q = query(
        collection(db, "notes"),
        where("userId", "==", auth.currentUser.uid)
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

 
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 PIN / UNPIN
  const handlePin = async (note) => {
    try {
      await updateDoc(doc(db, "notes", note.id), {
        isPinned: !note.isPinned
      });

      setNotes(notes.map(n =>
        n.id === note.id
          ? { ...n, isPinned: !n.isPinned }
          : n
      ));
    } catch (error) {
      console.log(error);
    }
  };

 
  const handleUpdate = async (id) => {

    if (!editTitle || !editContent) {
      alert("Fill all fields");
      return;
    }

    try {
      await updateDoc(doc(db, "notes", id), {
        title: editTitle,
        content: editContent
      });

      setNotes(notes.map(note =>
        note.id === id
          ? { ...note, title: editTitle, content: editContent }
          : note
      ));

      setEditingId(null);

    } catch (error) {
      console.log(error);
    }
  };


  const sortedNotes = [...notes].sort((a, b) => {
    return (b.isPinned === true) - (a.isPinned === true);
  });

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

        {sortedNotes.map((note) => (

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

         
              {editingId === note.id ? (
                <>
                  <TextField
                    fullWidth
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    multiline
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                </>
              ) : (
                <>
                  <Typography variant="h6">
                    {note.isPinned ? "📌 " + note.title : note.title}
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
                </>
              )}

              <Box sx={{ mt: 2 }}>

                {editingId === note.id ? (
                  <>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleUpdate(note.id)}
                    >
                      Save
                    </Button>

                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ ml: 2 }}
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mr: 2 }}
                      onClick={() => {
                        setEditingId(note.id);
                        setEditTitle(note.title);
                        setEditContent(note.content);
                      }}
                    >
                      Edit
                    </Button>

               
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mr: 2, color: "white", borderColor: "white" }}
                      onClick={() => handlePin(note)}
                    >
                      {note.isPinned ? "Unpin" : "Pin"}
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(note.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}

              </Box>

            </CardContent>

          </Card>

        ))}

      </Box>

    </Box>

  );
}

export default Notes;