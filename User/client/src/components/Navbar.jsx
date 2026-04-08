import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { MenuIcon, Ticket, XIcon, User, LogOut } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import PopUpModal from './PopUpModal'

const Navbar = ({ onContactClick }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { isLoggedIn, userData, setIsLoggedIn, setUserData, logout } = useContext(AppContext)
  const navigate = useNavigate()

  

  return (
    <>
      <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-2.5 backdrop-brightness-35 backdrop-blur-xs'>
        <Link to='/' className='max-md:flex-1'>
          <img src="./src/assets/goshow.png" alt='' className='w-24 h-auto lg:w-30'/>
        </Link>

        <div className={`max-md:absolute max-md:top-0 max-md:left-0 lg:20 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen font-bold min-md:rounded-full backdrop-blur bg-black/95 md:bg-white/10 md:border border-white-300/20 overflow-hidden transition-[width] duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>

          <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' onClick={() => setIsOpen(!isOpen)}/>

          <Link className='hover:text-primary active:scale-95 transition' onClick={() => {scrollTo(0,0); setIsOpen(false)}} to='/'>Home</Link>
          <Link className='hover:text-primary active:scale-95 transition' onClick={() => {scrollTo(0,0); setIsOpen(false)}} to='/movies'>Movies</Link>
          <Link className='hover:text-primary active:scale-95 transition' onClick={() => {scrollTo(0,0); setIsOpen(false)}} to='/'>Releases</Link>

          <button
            className='hover:text-primary active:scale-95 transition cursor-pointer'
            onClick={onContactClick}
          >
            Contact
          </button>
        </div>
        
        <div className='flex items-center gap-8'>
          {!isLoggedIn ? (
            <button
              onClick={() => navigate('/user/login')}
              className='px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dull transition cursor-pointer'
            >
              Login
            </button>
          ) : (
            <div className='flex items-center gap-4'>
              <User
                className='w-6 h-6 cursor-pointer hover:text-primary transition'
                onClick={() => navigate('/profile')}
              />
              <Ticket
                className='w-6 h-6 cursor-pointer hover:text-primary transition'
                onClick={() => navigate('/my-bookings')}
              />
              <LogOut
                className='w-6 h-6 cursor-pointer hover:text-primary transition'
                onClick={async () => { await logout(); navigate('/'); }}
              />
            </div>
          )}
        </div>

        <MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
      </div> 
    </>
  )
}

export default Navbar
