import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// const config = {
//   initialColorMode: 'light',
//   useSystemColorMode: false,
// }

const theme = extendTheme({
  colors: {
    pink1: '#97266D',
    pink2: '#ED64A6',
    yellow1: '#D69E2E',
    yellow2: '#ECC94B',
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: "Lato, sans-serif",
    mono: "Menlo, monospace",
  },
})
// const theme = extendTheme({ colors, config })


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
