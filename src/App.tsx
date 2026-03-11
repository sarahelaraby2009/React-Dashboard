import { useState } from 'react'
import './App.css' 
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TopBar from './components/topBar.js'
import SideBar from './components/sideBar.js'
import Home from './Pages/Home.js'
import { Routes,Route } from 'react-router-dom'
import UserList from './Pages/userlist.js'
import UserDetails from './Pages/userDetails.js'
import ProductList from './Pages/ProductList.js'
import CreateUser from './Pages/createUser.js'
import CreateProduct from './Pages/createProduct.js'
import ProductDetails from './Pages/productDetails.js'

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
              <Route path='/products' element={<ProductList/>}/>
              <Route path='/users/:id' element={<UserDetails/>}/>
              <Route path='/products/:id' element={<ProductDetails/>}/>
              <Route path='/users/createUser' element={<CreateUser/>}/>
              <Route path='/products/createProduct' element={<CreateProduct/>}/>
              
              
              
              
               
            </Routes>
           
           </div>
         
         </div>
        
          </ThemeProvider>

    ) } 
  export default App
