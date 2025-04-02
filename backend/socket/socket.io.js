import express from "express";
const app=express();
import { Server } from "socket.io";
import {createServer} from "http";

const httpServer=createServer(app);
const io=new Server(httpServer,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true,
    }
});

let users={};
let disconnectedUsers={};

io.on("connection",(socket)=>{
  

    socket.on("register",(data)=>{
        users[data]=socket.id;
      
        socket.emit("registered",users);
       
    })
    
    socket.on("sendMessage",(data)=>{
        const {message,sender,receiver}=data;
        // users[receiver]=socket.id;
        const recipientSocketId=users[receiver];
       
        if(recipientSocketId){
            io.to(recipientSocketId).emit("receiveMessage",data);
           
        }
       
       
    })

   

    socket.on("disconnect",()=>{
        const userId=Object.keys(users).find(key => users[key] === socket.id);
        if (userId) {
            delete users[userId];
            disconnectedUsers[userId]=socket.id;
        }
       
    })
    
})


export {app,httpServer,io};