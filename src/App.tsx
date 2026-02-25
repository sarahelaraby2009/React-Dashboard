import { useState } from 'react'
import './App.css' 
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TopBar from './components/topBar.js'
import SideBar from './components/sideBar.js'
import { Typography } from '@mui/material'
import FeaturedInfo from './components/featuredInfo.js'



  const theme = createTheme({ typography: { fontFamily: "source" }, }) 


  function App() { 
    return (
    <ThemeProvider theme={theme}>
         <TopBar/>
         <div style={{display:"flex"}}>
           <SideBar/>
          <FeaturedInfo/>
         </div>
        
          </ThemeProvider>

    ) } 
  export default App
