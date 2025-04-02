import React from 'react'
import image from "../assets/5625.jpg"
const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md">
        <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">
                <img src={image}  alt="Logo" className="h-8 w-8 mr-2 object-cover" />
                ChatApp
            </a>
        </div>
    </div>
  )
}

export default Navbar