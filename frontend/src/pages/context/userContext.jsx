import { createContext, useState } from "react";

const userContext=createContext();
export const UserProvider=({children})=>{
    const [islogin, setislogin] = useState(false);
    const [user, setuser] = useState()
    return (
       < userContext.Provider value={{islogin,setislogin,user,setuser}}>
       {children}
       </userContext.Provider>
    )
}

export default userContext