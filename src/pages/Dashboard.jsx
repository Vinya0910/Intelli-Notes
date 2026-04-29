import Sidebar from "../components/Sidebar";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { useState, useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

import { generateAI } from "../services/ai";

function Dashboard() {

const [notes, setNotes] = useState([]);
const [selectedNote, setSelectedNote] = useState(null);
const [aiResult, setAiResult] = useState("");

useEffect(() => {

const fetchNotes = async () => {

const querySnapshot = await getDocs(collection(db, "notes"));

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
minHeight: "100vh",
background:
"radial-gradient(circle at 30% 20%, rgba(79,195,247,0.15), transparent 40%), linear-gradient(135deg,#0f2027,#203a43,#2c5364)"
}}
>

<Sidebar />

<Box sx={{ width: "30%", p: 3 }}>

<Typography
variant="h4"
sx={{
color: "white",
mb: 3,
fontWeight: "bold"
}}
> 
YourNotes
</Typography>

{notes.map((note) => (
<Card
key={note.id}
onClick={() => setSelectedNote(note)}
sx={{
mb: 2,
background:
selectedNote?.id === note.id
? "#2a3b47"
: "#1e1e1e",
color: "white",
borderRadius: "10px",
cursor: "pointer",
transition: "0.25s",
width: "100%",

"&:hover": {
transform: "scale(1.04)"
},

boxShadow:
selectedNote?.id === note.id
? "0px 0px 12px rgba(79,195,247,0.6)"
: "none"

}}
>

<CardContent
sx={{
whiteSpace: "nowrap",
overflow: "hidden",
textOverflow: "ellipsis"
}}
> 
{note.title}
</CardContent>

</Card>
))}

</Box>

<Box
sx={{
flexGrow: 1,
display: "flex",
justifyContent:"center",
alignItem:"center"
}}
>

{notes.length === 0 && (

<Box
sx={{
flexGrow: 1,
display: "flex",
justifyContent: "center",
alignItems: "center"
}}
>

<Card
sx={{
width: "80%",
maxWidth: "1000px",
background: "rgba(30,30,30,0.6)",
backdropFilter: "blur(10px)",
borderRadius: "18px",
color: "white",
textAlign: "center",
padding: "55px",
boxShadow: "0px 10px 40px rgba(0,0,0,0.4)",
transition: "0.35s",

"&:hover": {
transform: "translateY(-10px) scale(1.03)",
boxShadow: "0px 25px 60px rgba(0,0,0,0.6)"
}

}}
>

<Typography
variant="h3"
sx={{
fontWeight: "bold",
mb: 3
}}
> 
"Every idea begins with a note."
</Typography>

<Typography
sx={{
color: "#ccc",
fontSize: "18px",
lineHeight: 1.6
}}
> 
Capture your thoughts and let AI transform them into summaries, key points and insights.
</Typography>

</Card>

</Box>

)}

{selectedNote && (

<Card
sx={{
width: "85%",
background: "rgba(30,30,30,0.6)",
backdropFilter: "blur(10px)",
borderRadius: "14px",
color: "white",
boxShadow: "0px 8px 25px rgba(0,0,0,0.4)",
maxHeight: "80vh",
overflowY: "auto",

"&::-webkit-scrollbar": {
width: "6px"
},
"&::-webkit-scrollbar-track": {
background: "transparent"
},
"&::-webkit-scrollbar-thumb": {
background: "#4fc3f7",
borderRadius: "10px"
}

}}
>

<CardContent>

<Typography variant="h4">
{selectedNote.title}
</Typography>

<Typography sx={{ color: "#ccc", mt: 2 }}>
{selectedNote.content}
</Typography>

<Typography variant="h6" sx={{ mt: 4 }}>
AI Tools
</Typography>

<Button
variant="contained"
sx={{ mt: 2, mr: 2 }}
onClick={handleSummary}
> 
GenerateSummary
</Button>

<Button
variant="outlined"
sx={{ mt: 2, mr: 2, color: "white", borderColor: "white" }}
onClick={handleKeyPoints}
> 
KeyPoints
</Button>

<Button
variant="outlined"
sx={{ mt: 2, color: "white", borderColor: "white" }}
onClick={handleQuestions}
> 
Questions
</Button>

<Typography variant="h6" sx={{ mt: 4 }}>
AI Result
</Typography>

<Typography
sx={{
color: "#ccc",
mt: 1,
whiteSpace: "pre-line"
}}
> 
{aiResult}
</Typography>

</CardContent>

</Card>

)}

</Box>

</Box>

);

}

export default Dashboard;