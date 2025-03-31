import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md">
        <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">
                <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
                ChatApp
            </a>
        </div>
    </div>
  )
}

export default Navbar