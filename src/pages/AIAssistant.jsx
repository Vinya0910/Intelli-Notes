import Sidebar from "../components/Sidebar";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  MenuItem,
  Select,
  TextField
} from "@mui/material";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";

import { db, auth } from "../firebase/firebase";

import { generateAI } from "../services/ai";

function AIAssistant() {

  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const [aiResult, setAiResult] = useState("");

  // FETCH NOTES
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

      if (data.length > 0) {
        setSelectedNote(data[0]);
      }

    };

    fetchNotes();

  }, []);

  // AI CHAT
  const handleChat = async () => {

    if (!selectedNote || !chatInput) return;

    const prompt = `
You are an AI study assistant.
Give concise and well- structured answers.
Rules:
-Use bullet points whenever possible
-Keep answers clean and readable
-Avoid very large paragraph
-Use headings if needed
- Explain clearly and shortly
- Keep space after every point.
      Note:
      ${selectedNote.content}

      User:
      ${chatInput}
    `;

    const result = await generateAI(prompt);

    setChatHistory(prev => [
      ...prev,
      { role: "user", text: chatInput },
      { role: "ai", text: result }
    ]);

    setChatInput("");

  };

  // FLASHCARDS
  const handleFlashcards = async () => {

    if (!selectedNote) return;

    const prompt = `
      Create flashcards from this note:

      ${selectedNote.content}
    `;

    const result = await generateAI(prompt);

    setAiResult(result);

  };

  // EXPLAIN SIMPLY
  const handleExplainSimply = async () => {

    if (!selectedNote) return;

    const prompt = `
      Explain this note in beginner-friendly language:

      ${selectedNote.content}
    `;

    const result = await generateAI(prompt);

    setAiResult(result);

  };

  // INTERVIEW PREP
  const handleInterviewPrep = async () => {

    if (!selectedNote) return;

    const prompt = `
      Generate interview questions and answers from this note:

      ${selectedNote.content}
    `;

    const result = await generateAI(prompt);

    setAiResult(result);

  };

  return (

    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 18% 12%, rgba(125,211,252,0.18), transparent 32%), radial-gradient(circle at 82% 18%, rgba(196,181,253,0.16), transparent 30%), linear-gradient(135deg,#07111f,#10283a 54%,#172033)"
      }}
    >

      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 2, md: 4 },
          minWidth: 0
        }}
      >

        <Card
          sx={{
            width: { xs: "100%", md: "85%" },
            minHeight: { xs: "auto", md: "85vh" },
            backdropFilter: "blur(18px)",
            color: "white",
            overflow: "hidden"
          }}
        >

          <CardContent>

            <Typography
              variant="h4"
              sx={{
                mb: 4,
                fontWeight: "bold",
                fontSize: { xs: 28, md: 34 }
              }}
            >
              AI Assistant
            </Typography>

            {/* NOTE SELECT */}
            <Typography sx={{ mb: 1 }}>
              Select Note
            </Typography>

            <Select
              fullWidth
              value={selectedNote?.id || ""}
              onChange={(e) => {

                const note = notes.find(
                  note => note.id === e.target.value
                );

                setSelectedNote(note);

                setChatHistory([]);
                setAiResult("");

              }}
              sx={{
                mb: 4,
                color: "white"
              }}
            >

              {notes.map((note) => (
                <MenuItem
                  key={note.id}
                  value={note.id}
                >
                  {note.title}
                </MenuItem>
              ))}

            </Select>

            {/* AI TOOLS */}
            <Typography
              variant="h6"
              sx={{ mb: 2 }}
            >
              AI Tools
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>

              <Button
                variant="contained"
                onClick={handleFlashcards}
              >
                Flashcards
              </Button>

              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white"
                }}
                onClick={handleExplainSimply}
              >
                Explain Simply
              </Button>

              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white"
                }}
                onClick={handleInterviewPrep}
              >
                Interview Prep
              </Button>

            </Box>

            {/* AI RESULT */}
            <Typography
              variant="h6"
              sx={{ mt: 4 }}
            >
              AI Result
            </Typography>

            <Typography
              sx={{
                mt: 2,
                color: "#ccc",
                whiteSpace: "pre-line",
                lineHeight: 1.7,
                overflowWrap: "anywhere"
              }}
            >
              {aiResult}
            </Typography>

            {/* CHAT SECTION */}
            <Typography
              variant="h6"
              sx={{ mt: 5 }}
            >
              Chat with AI
            </Typography>

            <Box
              sx={{
                mt: 2,
                maxHeight: "250px",
                overflowY: "auto",
                p: 2,
                borderRadius: "12px",
                background: "rgba(255,255,255,0.05)"
              }}
            >

              {chatHistory.length === 0 ? (

                <Typography sx={{ color: "#aaa" }}>
                  Start chatting with AI...
                </Typography>

              ) : (

                chatHistory.map((msg, index) => (

                  <Box
                    key={index}
                    sx={{
                      mb: 2
                    }}
                  >

                    <Typography
                      sx={{
                        fontWeight: "bold"
                      }}
                    >
                      {msg.role === "user" ? "You" : "AI"}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#ddd",
                        overflowWrap: "anywhere",
                        whiteSpace: "pre-line"
                      }}
                    >
                      {msg.text}
                    </Typography>

                  </Box>

                ))

              )}

            </Box>

            {/* CHAT INPUT */}
            <TextField
              fullWidth
              placeholder="Ask anything about your note..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              sx={{ mt: 3 }}
            />

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleChat}
            >
              Ask AI
            </Button>

          </CardContent>

        </Card>

      </Box>

    </Box>

  );

}

export default AIAssistant;
