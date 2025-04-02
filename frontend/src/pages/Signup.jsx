import React, { useContext, useState } from 'react'
import axios from "axios"
import { backend } from '../config.js'
import userContext from './context/userContext.jsx'
import { useNavigate } from 'react-router-dom'


const Signup = () => {
    const [name, setname] = useState(" ")
    const [email, setemail] = useState(" ")
    const [username, setusername] = useState(" ")
    const [password, setpassword] = useState("")
    const {setislogin,setuser,islogin}=useContext(userContext);
    const navigate =useNavigate();
    console.log(islogin)

    const onFormSubmit=async(e)=>{
        e.preventDefault();
      try {
          const formdata={
              name,
              email,
              username,
              password
          }
          const response=await axios.post(`${backend}/user/signup`,formdata,{withCredentials:true});
        
          localStorage.setItem("user",JSON.stringify(response.data.newUser));
          localStorage.setItem("islogin",true);
          setislogin(true);
          setuser(response.data.newUser);
          navigate("/");
          
      } catch (error) {
        if(error){
            console.log(error)
        }
      }
    }

  return (
    <div className='flex items-center justify-center h-screen bg-neutral-500'>
       
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md ">
                <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
                <form className="space-y-4" onSubmit={onFormSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="input input-bordered w-full"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Choose a username"
                            className="input input-bordered w-full"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full" 
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary w-full">Sign Up</button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <a onClick={()=>{navigate("/login")}} className="text-blue-500 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    
  )
}

export default Signup