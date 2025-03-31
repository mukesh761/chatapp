import React from 'react'
import Navbar from '../components/Navbar.jsx';
import LeftSide from '../components/LeftSide.jsx';
import RightSide from '../components/RightSide.jsx';



const Home = () => {
  return (
    <div className='h-screen '>
        <Navbar/>
        <div className='flex items-center justify-between'>
        <LeftSide/>
        <RightSide/>
        </div>
    </div>
  )
}

export default Home