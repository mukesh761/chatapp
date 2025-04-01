import { use } from "react";
import { createContext ,useEffect} from "react";
import { io } from "socket.io-client";

const socketioContext=createContext();

export const SocketProvider=({children})=>{
    const socket = io("http://localhost:3000", {
        withCredentials: true,
    });
    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected to socket server')
        })

        
        socket.on('disconnect', () => {
            console.log('disconnected from socket server')
        },[socket])
    })
    return(
        <socketioContext.Provider value={{socket}}>
            {children}
        </socketioContext.Provider>
    )
}

export default socketioContext;