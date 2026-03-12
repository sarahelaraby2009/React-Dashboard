import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

const theme = createTheme(); 

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline /> 
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);