import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { backend } from '../config'
import conversationContext from '../pages/context/conversationContext.jsx';

const LeftSide = () => {
    const [allUsers, setallUsers] = useState([]);
    // const [selectedUser, setselectedUser] = useState()
    const [allUsersfetch, setallUsersfetch] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");
    const {setselectedUser,selectedUser}=useContext(conversationContext)

    const getusers=async()=>{
        try {
            const response=await axios.get(`${backend}/user/getuser`,{withCredentials:true});
            const users=await response.data.user;
            console.log(users);
            setallUsersfetch(users)
            setallUsers(users);
        } catch (error) {
            if(error){
                console.log(error)
            }
        }
    }

   useEffect(() => {
     getusers()
   }, [])
   
   const searchuser=(e)=>{
    e.preventDefault();
    if (!searchTerm) {
        setallUsers(allUsersfetch); // Reset users if searchTerm is empty
        return;
      }
      const filteredUsers = allUsersfetch.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
      setallUsers(filteredUsers);
      console.log(searchTerm, filteredUsers);
   }

console.log(selectedUser)
  return (
    <div>
        <div className="w-96 h-full bg-gray-100 border-r flex items-start justify-center flex-col ">
            <form className="p-4 border-b w-full "  >
                <input
                    type="text"
                    placeholder="Search or start new chat"
                    className=" input input-bordered  w-full "
                    value={searchTerm}
                    onChange={(e)=>{setsearchTerm(e.target.value);searchuser(e)}}
                />
            </form>
            <ul className="overflow-y-auto max-h-[620px] w-full">
                {allUsers?.map((item,index)=>{
                    return(
                        <div key={index} >
                        <li className={selectedUser?._id==item._id?"p-4  mb-2 rounded-md bg-gray-200 cursor-pointer ":"p-4 bg-neutral-400 mb-2 rounded-md hover:bg-gray-100 cursor-pointer "} >
                        <div className="flex items-center" onClick={()=>{setselectedUser(item)}}>
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src={item?.profilepicture} />
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="font-bold">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                    last messages
                                </p>
                            </div>
                        </div>
                    </li>
                    </div>
                    )
                })}

            </ul>
        </div>
    </div>
  )
}

export default LeftSide