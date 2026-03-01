import { useState } from 'react'
import './App.css' 
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TopBar from './components/topBar.js'
import SideBar from './components/sideBar.js'
import Home from './Pages/Home.js'
import { Routes,Route } from 'react-router-dom'
import UserList from './Pages/userlist.js'

  const theme = createTheme({ typography: { fontFamily: "source",fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700, }, }) 


  function App() { 
    return (
    <ThemeProvider theme={theme}>
         <TopBar/>
         <div style={{display:"flex"}}>
           <SideBar/>
           <div style={{flex:1,marginLeft:"8px"}}>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/users' element={<UserList/>}/>
               
            </Routes>
           
           </div>
         
         </div>
        
          </ThemeProvider>

    ) } 
  export default App
