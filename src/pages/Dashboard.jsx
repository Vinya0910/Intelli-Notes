import Sidebar from "../components/Sidebar";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { useState, useEffect } from "react";

import { collection, getDocs, query,where } from "firebase/firestore";
import { db ,auth} from "../firebase/firebase";

import { generateAI } from "../services/ai";

function Dashboard() {

const [notes, setNotes] = useState([]);
const [selectedNote, setSelectedNote] = useState(null);
const [aiResult, setAiResult] = useState("");

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
"radial-gradient(circle at 18% 12%, rgba(125,211,252,0.18), transparent 32%), radial-gradient(circle at 82% 18%, rgba(196,181,253,0.16), transparent 30%), linear-gradient(135deg,#07111f,#10283a 54%,#172033)"
}}
>

<Sidebar />

{notes.length === 0 ? (

<Box
sx={{
flexGrow: 1,
display: "flex",
justifyContent: "center",
alignItems: "center",
p: { xs: 2, md: 4 }
}}
>

<Card
sx={{
width: "80%",
maxWidth: "1000px",
backdropFilter: "blur(18px)",
color: "white",
textAlign: "center",
padding: "55px",
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

) : (

<>

<Box sx={{ width: { xs: "34%", md: "30%" }, minWidth: { xs: 180, md: 280 }, p: { xs: 2, md: 3 } }}>

<Typography
variant="h4"
sx={{
color: "white",
mb: 3,
fontWeight: "bold",
letterSpacing: "-0.03em"
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
? "linear-gradient(135deg, rgba(125,211,252,0.18), rgba(165,180,252,0.12))"
: "rgba(15,23,42,0.62)",
color: "white",
cursor: "pointer",
transition: "0.25s",
width: "100%",

"&:hover": {
transform: "translateX(4px)",
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
alignItems:"center",
p: { xs: 2, md: 4 }
}}
>

{selectedNote && (

<Card
sx={{
width: "85%",
backdropFilter: "blur(18px)",
color: "white",
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

</>

)}

</Box>

);

}

export default Dashboard;
