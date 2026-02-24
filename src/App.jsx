import { useState } from 'react'
import './App.css' 
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TopBar from './components/topBar'



  const theme = createTheme({ typography: { fontFamily: ["source"] }, }) 


  function App() { 
    return (
    <ThemeProvider theme={theme}>
         <TopBar/>
      
          </ThemeProvider>

    ) } 
  export default App
