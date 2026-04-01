import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f8cff"
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e"
    }
  }
});

export default darkTheme;