import messageSchema from "../schema/messageSchema.js"
import conversationSchema from "../schema/conversationSchema.js"
import message from "../schema/messageSchema.js";


export const sendMessage=async(req,res)=>{
    try {
        const {message}=req.body;
        
        const  receiver=req.params.senderId;
        const sender=req.user._id;
        if(!message || !sender ||!receiver){
         return    res.json({message:"required all fields"})
        }
        let conversation=await conversationSchema.findOne({participants:{$all:[sender,receiver]}}).populate("messages")
       
        if(!conversation){
            conversation=await conversationSchema.create({
                participants:[receiver,sender]
            })
        }

        const newMessage=await messageSchema.create({
            sender,
            receiver,
            message,
        })



        await conversation.messages.push(newMessage);
        conversation.save();
      
       
       
        res.json({message:"message sent",newMessage,conversation})

    } catch (error) {
        if(error){
            console.log(error);
            res.json({message:error.message})
        }
    }
}

export const fetchConversation=async (req,res)=>{
    try {
        const sender=req.user._id;
        const receiver=req.params.receiver;
        const conversation=await conversationSchema.findOne({participants:{$all:[sender,receiver]}}).populate("messages")
        if(!conversation){
            return res.json({message:"start conversation"})
        }
        res.json({conversation});
    } catch (error) {
        if(error){
            console.log(error);
            res.json({message:error.message})
        }
    }
}