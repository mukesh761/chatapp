import { useContext, useEffect, useState } from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import userContext from './pages/context/UserContext'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'


function App() {
  const {setislogin,setuser,islogin,user}=useContext(userContext)
  const fetchuser=()=>{
    const islogin=localStorage.getItem("islogin");
    const user=JSON.parse(localStorage.getItem("user"))
    if(islogin && user){
      setislogin(islogin);
      setuser(user);
    }
  }
  
  useEffect(() => {
    console.log("useEffect triggered")
   fetchuser()
  },[setislogin])
    

  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={islogin?<Home/>:<Login/>}/>
        <Route path="/login" element={islogin?<Home/>:<Login/>}/>
        <Route path="/signup" element={islogin?<Home/>:<Signup/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
