import mongoose from "mongoose";
const conversationSchema=mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'message',
    }],

    
}, { timestamps: true })
const conversation=mongoose.model("conversation",conversationSchema);
export default conversation;