"use client";

//standard

//third party
import { createTheme } from "@mui/material/styles";

//local

let theme = createTheme({
  typography: {
    cover: {
      fontSize: "6vw",
      fontFamily: "Roboto",
    },
    cover_sub: {
      fontSize: "2vw",
      fontFamily: "Roboto",
    },
  },
  palette: {
    primary: {
      main: "#BADA55",
      //contrastText: "#fff",
    },
    secondary: {
      main: "#FF3939",
    },
    background: {
      main: "#FFDA79",
    },
    error: {
      main: "#FF1414",
    },
    success: {
      main: "#4F78FF",
    },
    warning: {
      main: "#FF7B1D",
    },
  },
});

export default theme;
