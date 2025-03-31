import React, { useContext } from 'react'
import conversationContext from '../pages/context/conversationContext.jsx'

const RightSide = () => {
    const {selectedUser}=useContext(conversationContext);
    
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
            <div className="flex flex-col h-full w-5/6">
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
                                <a>Profile</a>
                            </li>
                            <li>
                                <a>Settings</a>
                            </li>
                            <li>
                                <a>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Chat Messages Section */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    <div className="mb-4">
                        <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">
                            Hello! How are you?
                        </div>
                        <p className="text-xs text-gray-500 mt-1">10:00 AM</p>
                    </div>
                    <div className="mb-4 text-right">
                        <div className="bg-gray-200 text-gray-800 p-2 rounded-lg max-w-xs ml-auto">
                            I'm good, thank you! How about you?
                        </div>
                        <p className="text-xs text-gray-500 mt-1">10:02 AM</p>
                    </div>
                    <div className="mb-4">
                        <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">
                            I'm doing great, thanks for asking!
                        </div>
                        <p className="text-xs text-gray-500 mt-1">10:05 AM</p>
                    </div>
                </div>

                {/* Input Section */}
                <div className="flex items-center p-4 bg-gray-100 border-t border-gray-300">
                    <input
                        type="text"
                        placeholder="Type a message"
                        className="input input-bordered flex-1 mr-2"
                    />
                    <button className="btn btn-primary">Send</button>
                </div>
            </div>
        )}
    </div>
);
}

export default RightSide