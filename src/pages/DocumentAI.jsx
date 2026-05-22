import Sidebar from "../components/Sidebar";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Button
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { useState } from "react";

import mammoth from "mammoth";

import { generateAI } from "../services/ai";

function DocumentAI() {

  const [fileText, setFileText] = useState("");

  const [aiResult, setAiResult] = useState("");

  // FILE UPLOAD
  const handleFileUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFileText("");
    setAiResult("");

    // TXT FILE
    if (file.type === "text/plain") {

      const reader = new FileReader();

      reader.onload = (event) => {

        setFileText(event.target.result);

      };

      reader.readAsText(file);

    }

    // DOCX FILE
    else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {

      const reader = new FileReader();

      reader.onload = async (event) => {

        const arrayBuffer = event.target.result;

        const result = await mammoth.extractRawText({
          arrayBuffer
        });

        setFileText(result.value);

      };

      reader.readAsArrayBuffer(file);

    }

    else {

      alert("Only TXT and DOCX supported");

    }

  };

  // SUMMARY
  const handleSummary = async () => {

    const prompt =
      "Summarize this document in bullet points:\n" +
      fileText;

    const result = await generateAI(prompt);

    setAiResult(result);

  };

  // KEY POINTS
  const handleKeyPoints = async () => {

    const prompt =
      "Give important key points from this document:\n" +
      fileText;

    const result = await generateAI(prompt);

    setAiResult(result);

  };

  // QUESTIONS
  const handleQuestions = async () => {

    const prompt =
      "Generate interview/study questions from this document:\n" +
      fileText;

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
          p: { xs: 2, sm: 3, md: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 0
        }}
      >

        <Typography
          variant="h4"
          sx={{
            color: "text.primary",
            mb: { xs: 3, md: 4 },
            fontSize: { xs: 28, md: 34 },
            alignSelf: "center"
          }}
        >
          Files AI
        </Typography>

        <Card
          sx={{
            width: "100%",
            maxWidth: 900,
            p: 3,
            color: "text.primary",
            backdropFilter: "blur(18px)",
            background: (theme) => theme.palette.mode === "light"
              ? "rgba(248, 250, 252, 0.88)"
              : "rgba(15, 23, 42, 0.72)"
          }}
        >

          <CardContent>

            {/* FILE BUTTON */}
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
              sx={{
                minWidth: { xs: "100%", sm: 180 }
              }}
            >
              Upload TXT / DOCX

              <input
                hidden
                type="file"
                accept=".txt,.docx"
                onChange={handleFileUpload}
              />

            </Button>

            {/* AI BUTTONS */}
            {fileText && (

              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    color: "text.primary"
                  }}
                >
                  AI Tools
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                  <Button
                    variant="contained"
                    onClick={handleSummary}
                  >
                    Summary
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{
                      color: "text.primary",
                      borderColor: "divider"
                    }}
                    onClick={handleKeyPoints}
                  >
                    Key Points
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{
                      color: "text.primary",
                      borderColor: "divider"
                    }}
                    onClick={handleQuestions}
                  >
                    Questions
                  </Button>
                </Box>

              </Box>

            )}

            {/* AI RESULT */}
            {aiResult && (

              <Typography
                sx={{
                  mt: 4,
                  color: "text.secondary",
                  whiteSpace: "pre-line",
                  lineHeight: 1.8,
                  overflowWrap: "anywhere"
                }}
              >
                {aiResult}
              </Typography>

            )}

          </CardContent>

        </Card>

      </Box>

    </Box>

  );

}

export default DocumentAI;
