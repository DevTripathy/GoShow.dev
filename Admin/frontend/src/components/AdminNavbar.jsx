
import React from 'react'
import { assets } from '../assets/assets.js'
import { Link } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'

function AdminNavbar() {
  const { logout } = useAdminAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className='flex items-center justify-between px-6 md:px-10 h-16 border-gray-300/30'>
      <Link to="/admin">
        <img src={assets.goshow} alt='' className='w-24 h-auto lg:w-34' />
      </Link>
      <button
        onClick={handleLogout}
        className='px-4 py-1 sm:px-5 sm:py-1 bg-red-500 hover:bg-red-600 transition rounded-full font-medium cursor-pointer sm:text-[1rem] text-white'
      >
        Logout
      </button>
    </div>
  )
}

export default AdminNavbar
