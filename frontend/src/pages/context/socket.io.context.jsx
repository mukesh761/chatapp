import { use, useContext, useState } from "react";
import { createContext ,useEffect} from "react";
import { io } from "socket.io-client";
import userContext from "./userContext";

const socketioContext=createContext();

export const SocketProvider=({children})=>{
    const user=JSON.parse(localStorage.getItem("user"))
    console.log(user)
    const [isonline, setisonline] = useState(false)
    const socket = io("http://localhost:3000", {
        withCredentials: true,
    });
    useEffect(() => {
        socket.on('connect', () => {
           
        })
        if(user){
          
            socket.emit("register", user?._id);
        }
       
        socket.on('disconnect', () => {
          
            
        },[socket])
    })
   
    return(
        <socketioContext.Provider value={{socket,isonline,setisonline}}>
            {children}
        </socketioContext.Provider>
    )
}

export default socketioContext;