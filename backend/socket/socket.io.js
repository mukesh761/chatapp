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

io.on("connection",(socket)=>{
    console.log("the user id is",socket.id);
    console.log("a user connected",socket.id);

    socket.on("register",(data)=>{
        users[data]=socket.id;
       
    })
    
    socket.on("sendMessage",(data)=>{
        const {message,sender,receiver}=data;
        // users[receiver]=socket.id;
        const recipientSocketId=users[receiver];
        console.log("recipient socket id",recipientSocketId);
        if(recipientSocketId){
            io.to(recipientSocketId).emit("receiveMessage",data);
            console.log("message sent to recipient",data);
        }
       
       
    })

    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
    })
    
})


export {app,httpServer,io};