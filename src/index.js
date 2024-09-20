import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App.jsx";

const theme = extendTheme({
  colors: {
    primary: "#002654",
    secondary: "#CD1127",
    secondaryDark: "#a10e1f",
    grey: "#4d4d4d",
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: "Lato, sans-serif",
    mono: "Menlo, monospace",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
