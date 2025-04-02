import React, { useContext, useState } from 'react'
import axios from 'axios';
import { backend } from '../config';
import userContext from './context/userContext.jsx';
import { use } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")
    const {setislogin,setuser}=useContext(userContext);
    const navigate =useNavigate();
    const onFormSubmit=async(e)=>{
        e.preventDefault();
      try {
       
          const formdata={
              email,
              password
          }
          const response=await axios.post(`${backend}/user/login`,formdata,{withCredentials:true});
          
          localStorage.setItem("user",JSON.stringify(response.data.newUser));
          localStorage.setItem("islogin",true);
          setislogin(true);
          setuser(response.data.newUser)
          
      } catch (error) {
        if(error){
            console.log(error)
        }
      }
    }

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
    <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg ">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form className="space-y-4" onSubmit={onFormSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700">Username or Email</label>
                <input
                    type="text"
                    value={email} 
                    onChange={(e)=>{setemail(e.target.value)}}                    placeholder="Enter your username or email"
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    value={password} 
                    onChange={(e)=>{setpassword(e.target.value)}} 
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Login
            </button>
        </form>
        <p className="text-sm text-center text-gray-600">
            Don't have an account? <a onClick={()=>{navigate("/signup")}} className="text-blue-500 hover:underline">Sign up</a>
        </p>
    </div>
    </div>
  )
}

export default Login