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

  // NEW
  const [difficulty, setDifficulty] = useState("Medium");

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

Your job is to answer ONLY questions related to the provided notes.

STRICT RULES:
- Answer ONLY from the notes content
- Do NOT answer unrelated questions
- If question is unrelated, reply ONLY:
"Please ask questions related to the selected note only."

- Keep answers concise and educational
- Use bullet points whenever possible
- Avoid large paragraphs
- Use headings if needed
- Explain concepts clearly
- Use examples if helpful

NOTES:
${selectedNote.content}

QUESTION:
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
You are an expert AI learning assistant.

Create high-quality flashcards from these notes.

Rules:
- Create concise question-answer flashcards
- Focus on important concepts
- Keep answers short and clear
- Use easy-to-understand language
- Make flashcards revision-friendly

NOTES:
${selectedNote.content}
`;

    const result = await generateAI(prompt);

    setAiResult(result);

  };

  // EXPLAIN SIMPLY
  const handleExplainSimply = async () => {

    if (!selectedNote) return;

    const prompt = `
You are an expert teacher.

Explain these notes in a beginner-friendly way.

Rules:
- Use very simple language
- Explain concepts step-by-step
- Use examples wherever needed
- Avoid technical complexity
- Keep explanation clean and readable
- Use bullet points and headings

NOTES:
${selectedNote.content}
`;

    const result = await generateAI(prompt);

    setAiResult(result);

  };

  // INTERVIEW PREP
  const handleInterviewPrep = async () => {

    if (!selectedNote) return;

    const prompt = `
You are an expert technical interviewer.

Generate ${difficulty} level interview preparation from these notes.

Generate:
1. Interview questions
2. Detailed answers
3. Conceptual questions
4. Scenario-based questions
5. Important interview tips

Rules:
- Questions should test understanding
- Avoid repeated questions
- Keep answers professional
- Focus on interview-relevant concepts
- Use clean formatting

NOTES:
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
        background: (theme) => theme.palette.mode === "light"
          ? "radial-gradient(circle at 18% 12%, rgba(100,116,139,0.12), transparent 32%), radial-gradient(circle at 82% 18%, rgba(63,100,120,0.08), transparent 30%), linear-gradient(135deg,#eef2f6,#e8eef4 54%,#f3f6f9)"
          : "radial-gradient(circle at 18% 12%, rgba(125,211,252,0.18), transparent 32%), radial-gradient(circle at 82% 18%, rgba(196,181,253,0.16), transparent 30%), linear-gradient(135deg,#07111f,#10283a 54%,#172033)",
        overflowX: "hidden"
      }}
    >

      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 2, sm: 3, md: 4 },
          minWidth: 0
        }}
      >

        <Card
          sx={{
            width: "100%",
            maxWidth: 980,
            minHeight: { xs: "auto", md: "85vh" },
            backdropFilter: "blur(22px)",
            color: "text.primary",
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
                color: "text.primary",
                "& .MuiSelect-icon": {
                  color: "text.secondary"
                }
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

            {/* DIFFICULTY */}
            <Typography sx={{ mb: 1 }}>
              Interview Difficulty
            </Typography>

            <Select
              fullWidth
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              sx={{
                mb: 4,
                color: "text.primary"
              }}
            >

              <MenuItem value="Easy">
                Easy
              </MenuItem>

              <MenuItem value="Medium">
                Medium
              </MenuItem>

              <MenuItem value="Hard">
                Hard
              </MenuItem>

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
                  color: "text.primary",
                  borderColor: "divider"
                }}
                onClick={handleExplainSimply}
              >
                Explain Simply
              </Button>

              <Button
                variant="outlined"
                sx={{
                  color: "text.primary",
                  borderColor: "divider"
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
                color: "text.secondary",
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
                borderRadius: 2,
                border: (theme) => theme.palette.mode === "light"
                  ? "1px solid rgba(100, 116, 139, 0.18)"
                  : "1px solid rgba(148, 163, 184, 0.16)",
                background: (theme) => theme.palette.mode === "light"
                  ? "rgba(241, 245, 249, 0.78)"
                  : "rgba(255,255,255,0.05)"
              }}
            >

              {chatHistory.length === 0 ? (

                <Typography sx={{ color: "text.secondary" }}>
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
                        color: "text.secondary",
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
              sx={{ mt: 2, minWidth: { xs: "100%", sm: 120 } }}
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