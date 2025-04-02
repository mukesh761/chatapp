import mongoose from "mongoose";
 const connection=mongoose.connect("mongodb://127.0.0.1:27017/chat_application")
 
export default connection;
