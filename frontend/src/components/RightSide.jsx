import React, { useContext, useEffect, useRef, useState } from 'react'
import conversationContext from '../pages/context/conversationContext.jsx'
import axios from 'axios';
import { backend } from '../config.js';
import userContext from "../pages/context/userContext.jsx"
import socketioContext from '../pages/context/socket.io.context.jsx';



const RightSide = () => {
    const { socket } = useContext(socketioContext)
    const [messagebox, setmessagebox] = useState("")
    const { selectedUser } = useContext(conversationContext);
    const [conversation, setconversation] = useState([])
    const { user } = useContext(userContext)
    const messageEndRef = useRef(null);


    const handleUserClick = async (item) => {
        try {
            const response = await axios.get(`${backend}/message/fetchconversation/${item}`, { withCredentials: true });
            const data = await response.data.conversation?.messages;
            setconversation(data)
            console.log(conversation)
        } catch (error) {
            if (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        if (selectedUser) {
            handleUserClick(selectedUser._id)
        }
    }, [selectedUser])



    // const sendMessage = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const message = messagebox;
    //         const response = await axios.post(`${backend}/message/send/${selectedUser._id}`, { message }, { withCredentials: true });
    //         console.log(response.data)
    //     } catch (error) {
    //         if (error) {
    //             console.log(error)
    //         }
    //     }
    // }

    const sendMessage = async (e) => {
        e.preventDefault();

        try {
            const message = messagebox;
            const response = await axios.post(`${backend}/message/send/${selectedUser._id}`, { message }, { withCredentials: true });
            console.log(response.data)

            const newMessage = response.data.newMessage;
            if(conversation.length<0){
                setconversation(newMessage)
            }
            else{

                setconversation((prevConversation) => [...prevConversation, newMessage]);
            }

            // Emit the message to the socket server
            socket.emit("sendMessage", response.data.newMessage);
            socket.emit("register", user._id)
            setmessagebox("");


            // Clear the input field after sending the message
        } catch (error) {
            if (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        socket.on("receiveMessage", (newMessage) => {
            console.log("Received message:", newMessage);
        if(conversation.length<0){
            setconversation(newMessage)
        }
        else{


            setconversation((prevConversation) => {
                const isMessageExist = prevConversation.some(msg => msg._id === newMessage._id);
                if (!isMessageExist) {
                    return [...prevConversation, newMessage];
                }
                return prevConversation;
            })
        }
            
        });

        // Cleanup the socket event listener on component unmount
        return () => {
            socket.off("receiveMessage");
        };
    }, [socket]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [conversation]);

   
    return (
        <div className="h-[670px] w-screen flex items-center justify-center bg-gray-100">
            {!selectedUser ? (
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-700">No Conversation Selected</h2>
                    <p className="text-gray-500 mt-2">Please select a user to start a conversation.</p>
                    <div className="mt-4">
                        <button className="btn btn-primary">Browse Users</button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-full w-5/6 justify-between">
                    {/* User Info Section */}
                    <div className="flex items-center justify-between p-4 bg-gray-100   w-full">
                        <div className="flex items-center">
                            <img
                                src={selectedUser?.profilepicture}
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="ml-3">
                                <h2 className="text-lg font-semibold">{selectedUser?.username}</h2>
                                <p className="text-sm text-gray-500">Online</p>
                            </div>
                        </div>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-sm btn-outline">
                                Menu
                            </label>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <a>Settings</a>
                                </li>

                            </ul>
                        </div>
                    </div>

                    {/* Chat Messages Section */}
                  
                        {/* Chat Messages */}
                        {conversation ? (
                            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                                {conversation?.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            {item.receiver === user._id ? (
                                                <div className="mb-4">
                                                    <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">
                                                        {item.message}
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">10:00 AM</p>
                                                </div>
                                            ) : (
                                                <div className="mb-4 text-right">
                                                    <div className="bg-gray-200 text-gray-800 p-2 rounded-lg ml-auto max-w-xs w-auto">
                                                        {item.message}
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">10:02 AM</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                                {/* Scroll to the bottom when a new message is added */}
                                <div ref={messageEndRef}></div>
                            </div>
                        ) : ""}
                        <form className="flex items-center p-4 bg-gray-100 border-t border-gray-300 mb-10" onSubmit={sendMessage}>
                            <input
                                type="text"
                                placeholder="Type a message"
                                className="input input-bordered flex-1 mr-2"
                                value={messagebox}
                                onChange={(e) => setmessagebox(e.target.value)}
                            />
                            <button className="btn btn-primary" type='submit'>Send</button>
                        </form>
                    </div>
            )}
                </div>
            )
            }

            export default RightSide