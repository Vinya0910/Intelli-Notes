import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7dd3fc",
      contrastText: "#07111f"
    },
    secondary: {
      main: "#c4b5fd"
    },
    error: {
      main: "#fb7185"
    },
    background: {
      default: "#07111f",
      paper: "rgba(12, 22, 38, 0.78)"
    },
    text: {
      primary: "#f8fafc",
      secondary: "#a8b3c7"
    },
    divider: "rgba(148, 163, 184, 0.18)"
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    h3: {
      fontWeight: 800,
      letterSpacing: "-0.03em"
    },
    h4: {
      fontWeight: 800,
      letterSpacing: "-0.025em"
    },
    h6: {
      fontWeight: 700
    },
    button: {
      fontWeight: 800,
      letterSpacing: 0,
      textTransform: "none"
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            "radial-gradient(circle at 10% 10%, rgba(125, 211, 252, 0.16), transparent 32%), linear-gradient(135deg, #07111f 0%, #0e2636 52%, #172033 100%)"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage:
            "linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.68))",
          border: "1px solid rgba(148, 163, 184, 0.18)",
          boxShadow: "0 24px 70px rgba(2, 6, 23, 0.34)"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          minHeight: 42,
          boxShadow: "none"
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #7dd3fc 0%, #a5b4fc 100%)",
          "&:hover": {
            boxShadow: "0 14px 34px rgba(125, 211, 252, 0.24)"
          }
        },
        outlined: {
          borderColor: "rgba(226, 232, 240, 0.24)"
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined"
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            background: "rgba(15, 23, 42, 0.62)",
            borderRadius: 8,
            "& fieldset": {
              borderColor: "rgba(148, 163, 184, 0.26)"
            },
            "&:hover fieldset": {
              borderColor: "rgba(125, 211, 252, 0.58)"
            },
            "&.Mui-focused fieldset": {
              borderColor: "#7dd3fc"
            }
          },
          "& .MuiInputLabel-root": {
            color: "#a8b3c7"
          }
        }
      }
    }
  }
});

export default darkTheme;
