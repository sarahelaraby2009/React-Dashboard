import { useEffect, useState } from 'react'
import './App.css' 
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

function App() { 
     
    const [search,setSearch]=useState("")
    const[debounce,setDebounce]=useState(search)
    useEffect(()=>{
      const timerDebounce=setTimeout(()=>{
        setDebounce(search)
      },300)
      return ()=>clearTimeout(timerDebounce)
    },[search])
    
    return (
    <>
         <TopBar onSearch={setSearch}/>
         <div style={{display:"flex",width:"100%",minHeight:"calc(100vh - 80px)",overflow:"hidden"}}>
           <SideBar/>
           <div style={{flex:1,marginLeft:"8px",width:"100%",overflowY:"auto"}}>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/users' element={<UserList searchQuery={debounce}/>}/>
              <Route path='/products' element={<ProductList searchQuery={debounce}/>}/>
              <Route path='/users/:id' element={<UserDetails/>}/>
              <Route path='/products/:id' element={<ProductDetails/>}/>
              <Route path='/users/createUser' element={<CreateUser/>}/>
              <Route path='/products/createProduct' element={<CreateProduct/>}/>
              
              
              
              
               
            </Routes>
           
           </div>
         
         </div>
        
    </>
    )
}
export default App
