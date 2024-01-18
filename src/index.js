import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
// import App from './App';
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#006AA7",
    secondary: "#e0bf00",
    secondaryDark: "#ccad00",
    // secondary: "#d6b600",
    // secondary: "#FFCD00",
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
