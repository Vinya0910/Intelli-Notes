import Sidebar from "../components/Sidebar";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { useState, useEffect } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

import { generateAI } from "../services/ai";

function Dashboard() {

const [notes, setNotes] = useState([]);
const [selectedNote, setSelectedNote] = useState(null);
const [aiResult, setAiResult] = useState("");
const[loading,setLoading] = useState(true);

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


const sortedData = [...data].sort((a, b) => {
return (b.isPinned === true) - (a.isPinned === true);
});

setNotes(sortedData);


if (sortedData.length > 0) {
setSelectedNote(sortedData[0]);
}
setLoading(false);
};

fetchNotes();

}, []);


const handleSummary = async () => {
if (!selectedNote) return;
const prompt = "Summarize this note:\n" + selectedNote.content;
const result = await generateAI(prompt);
setAiResult(result);
};

const handleKeyPoints = async () => {
if (!selectedNote) return;
const prompt = "Give key points from this note:\n" + selectedNote.content;
const result = await generateAI(prompt);
setAiResult(result);
};

const handleQuestions = async () => {
if (!selectedNote) return;
const prompt = "Generate questions from this note:\n" + selectedNote.content;
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
? "radial-gradient(circle at 18% 12%, rgba(14,165,233,0.16), transparent 32%), radial-gradient(circle at 82% 18%, rgba(79,70,229,0.12), transparent 30%), linear-gradient(135deg,#f8fafc,#eaf4ff 54%,#f4f7fb)"
: "radial-gradient(circle at 18% 12%, rgba(125,211,252,0.18), transparent 32%), radial-gradient(circle at 82% 18%, rgba(196,181,253,0.16), transparent 30%), linear-gradient(135deg,#07111f,#10283a 54%,#172033)",
overflowX: "hidden"
}}
>

<Sidebar />

{ !loading && notes.length === 0 ? (

<Box
sx={{
flexGrow: 1,
display: "flex",
justifyContent: "center",
alignItems: "center",
p: { xs: 2, md: 4 },
minWidth: 0,
width: "100%"
}}
>

<Card
sx={{
width: { xs: "100%", sm: "88%", md: "80%" },
maxWidth: "1000px",
backdropFilter: "blur(18px)",
color: "text.primary",
textAlign: "center",
padding: { xs: 3, sm: 5, md: "55px" },
transition: "0.35s",

"&:hover": {
transform: "translateY(-6px)",
borderColor: "rgba(125, 211, 252, 0.38)"
}

}}
>

<Typography
variant="h3"
sx={{
fontWeight: "bold",
mb: 3,
fontSize: { xs: 30, sm: 40, md: 48 }
}}
> 
"Every idea begins with a note."
</Typography>

<Typography
sx={{
color: "text.secondary",
fontSize: { xs: 16, sm: 18 },
lineHeight: 1.6
}}
> 
Capture your thoughts and let AI transform them into summaries, key points and insights.
</Typography>

</Card>

</Box>

) : (

<>

<Box sx={{ width: { xs: "100%", md: "32%" }, minWidth: { xs: 0, md: 280 }, maxWidth: { xs: "100%", md: 380 }, p: { xs: 2, md: 3 } }}>

<Typography
variant="h4"
sx={{
color: "text.primary",
mb: { xs: 2, md: 3 },
fontWeight: "bold",
letterSpacing: 0,
fontSize: { xs: 28, md: 34 }
}}
> 
Your Notes
</Typography>

{notes.map((note) => (
<Card
key={note.id}
onClick={() => setSelectedNote(note)}
sx={{
mb: 2,
background: (theme) => selectedNote?.id === note.id
? theme.palette.mode === "light"
  ? "linear-gradient(135deg, rgba(14,165,233,0.14), rgba(79,70,229,0.08))"
  : "linear-gradient(135deg, rgba(125,211,252,0.18), rgba(165,180,252,0.12))"
: theme.palette.mode === "light"
  ? "rgba(255,255,255,0.86)"
  : "rgba(15,23,42,0.62)",
color: "text.primary",
cursor: "pointer",
transition: "0.25s",
width: "100%",
border: selectedNote?.id === note.id
? "1px solid rgba(125, 211, 252, 0.42)"
: "1px solid rgba(148, 163, 184, 0.16)",

"&:hover": {
transform: { xs: "translateY(-2px)", md: "translateX(4px)" },
borderColor: "rgba(125, 211, 252, 0.38)"
},

boxShadow:
selectedNote?.id === note.id
? "0 18px 45px rgba(2, 6, 23, 0.28)"
: "0 12px 28px rgba(2, 6, 23, 0.18)"

}}
>

<CardContent
sx={{
whiteSpace: "nowrap",
overflow: "hidden",
textOverflow: "ellipsis",
py: { xs: 2, md: 2.25 },
fontWeight: 700
}}
> 
{/* 🔥 PIN ICON ADDED */}
{note.isPinned ? "📌 " + note.title : note.title}
</CardContent>

</Card>
))}

</Box>

<Box
sx={{
flexGrow: 1,
display: "flex",
justifyContent:"center",
alignItems:"center",
p: { xs: 2, md: 4 },
minWidth: 0,
width: "100%"
}}
>

{selectedNote && (

<Card
sx={{
width: { xs: "100%", md: "85%" },
maxWidth: 880,
backdropFilter: "blur(18px)",
color: "text.primary",
maxHeight: { xs: "none", md: "80vh" },
overflowY: "auto",

"&::-webkit-scrollbar": {
width: "6px"
},
"&::-webkit-scrollbar-track": {
background: "transparent"
},
"&::-webkit-scrollbar-thumb": {
background: (theme) => theme.palette.mode === "light" ? "#0284c7" : "#4fc3f7",
borderRadius: "10px"
}

}}
>

<CardContent>

<Typography variant="h4" sx={{ fontSize: { xs: 28, md: 34 }, overflowWrap: "anywhere" }}>
{selectedNote.title}
</Typography>

<Typography sx={{ color: "text.secondary", mt: 2, overflowWrap: "anywhere", whiteSpace: "pre-line", lineHeight: 1.75 }}>
{selectedNote.content}
</Typography>

<Typography variant="h6" sx={{ mt: 4 }}>
AI Tools
</Typography>

<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 2 }}>

<Button
variant="contained"
onClick={handleSummary}
> 
GenerateSummary
</Button>

<Button
variant="outlined"
sx={{ color: "text.primary", borderColor: "divider" }}
onClick={handleKeyPoints}
> 
KeyPoints
</Button>

<Button
variant="outlined"
sx={{ color: "text.primary", borderColor: "divider" }}
onClick={handleQuestions}
> 
Questions
</Button>

</Box>

<Typography variant="h6" sx={{ mt: 4 }}>
AI Result
</Typography>

<Typography
sx={{
color: "text.secondary",
mt: 1,
whiteSpace: "pre-line",
lineHeight: 1.7,
overflowWrap: "anywhere"
}}
> 
{aiResult}
</Typography>

</CardContent>

</Card>

)}

</Box>

</>

)}

</Box>

);

}

export default Dashboard;
