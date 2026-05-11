import Sidebar from "../components/Sidebar";
import { Box, Typography, Card, CardContent, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";

// FIREBASE IMPORTS
import { collection, getDocs, deleteDoc, doc, query, where, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

function Notes() {

  const [notes, setNotes] = useState([]);

  // SEARCH STATE
  const [search, setSearch] = useState("");

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

  // DELETE NOTE
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // PIN / UNPIN
  const handlePin = async (id, currentPinStatus) => {

    try {

      await updateDoc(doc(db, "notes", id), {
        isPinned: !currentPinStatus
      });

      setNotes(notes.map(note =>
        note.id === id
          ? { ...note, isPinned: !currentPinStatus }
          : note
      ));

    } catch (error) {
      console.log(error);
    }

  };

  // UPDATE NOTE
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

  // SORT NOTES
  const sortedNotes = [...notes].sort((a, b) => {

    const aSearchMatch = a.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const bSearchMatch = b.title
      .toLowerCase()
      .includes(search.toLowerCase());

    // Search match first
    if (aSearchMatch !== bSearchMatch) {
      return bSearchMatch - aSearchMatch;
    }

    // Then pinned notes
    return (b.isPinned === true) - (a.isPinned === true);

  });

  return (

    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 16% 10%, rgba(125,211,252,0.14), transparent 30%), radial-gradient(circle at 82% 18%, rgba(196,181,253,0.16), transparent 30%), linear-gradient(135deg,#07111f,#10283a 54%,#172033)",
        overflowX: "hidden"
      }}
    >

      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 0
        }}
      >

        <Typography variant="h4" sx={{ color: "white", mb: { xs: 3, md: 4 }, fontSize: { xs: 28, md: 34 } }}>
          All Notes
        </Typography>

        {/* SEARCH BAR */}
        <TextField
          placeholder="Search notes by title..."
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: "100%",
            maxWidth: 820,
            mb: 4,

            input: {
              color: "white"
            },

            "& .MuiOutlinedInput-root": {

              "& fieldset": {
                borderColor: "rgba(255,255,255,0.3)"
              },

              "&:hover fieldset": {
                borderColor: "#4fc3f7"
              },

              "&.Mui-focused fieldset": {
                borderColor: "#4fc3f7"
              }
            }
          }}
        />

        {sortedNotes.map((note) => (

          <Card
            key={note.id}
            sx={{
              width: "100%",
              maxWidth: 820,
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
                  <Typography variant="h6" sx={{ overflowWrap: "anywhere" }}>
                    {note.isPinned ? "📌 " + note.title : note.title}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      color: "#ccc",
                      lineHeight: 1.6,
                      whiteSpace: "pre-line",
                      overflowWrap: "anywhere"
                    }}
                  >
                    {note.content}
                  </Typography>
                </>
              )}

              <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1.5 }}>

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
                      sx={{ color: "white", borderColor: "white" }}
                      onClick={() => handlePin(note.id, note.isPinned)}
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
