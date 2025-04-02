import { createContext, useState } from "react";

const conversationContext=createContext();

 export const ConversationProvider=({children})=>{
    const [selectedUser, setselectedUser] = useState(null)
  
    return(

        <conversationContext.Provider value={{selectedUser,setselectedUser}}>
            {children}
        </conversationContext.Provider>
    )
}

export default conversationContext;
