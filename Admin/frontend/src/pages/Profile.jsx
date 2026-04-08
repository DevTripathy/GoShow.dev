import React from 'react'
import { useAdminAuth } from '../context/AdminAuthContext'
import BlurCircle from '../components/BlurCircle'
import Loading from '../components/Loading'
import { assets } from '../assets/assets'

const Profile = () => {
  const { adminData, loading } = useAdminAuth()

  if (loading || !adminData) {
    return <Loading />
  }

  return (
    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
      <BlurCircle top="100px" left="100px" />
      <div className='flex flex-col items-center'>
        <h1 className='text-2xl font-semibold mb-8'>Admin Profile</h1>
        <div className='bg-primary/8 border border-primary/20 rounded-lg p-6 w-full max-w-md'>
          <div className='flex flex-col items-center mb-6'>
            <img src={assets.profile} alt="Profile" className='w-20 h-20 rounded-full mb-4' />
            <h2 className='text-xl font-medium'>{adminData.name}</h2>
          </div>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Name</label>
              <p className='mt-1 p-2 bg-gray-100 rounded'>{adminData.name}</p>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Email</label>
              <p className='mt-1 p-2 bg-gray-100 rounded'>{adminData.email}</p>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Verification Status</label>
              <p className={`mt-1 p-2 rounded ${adminData.isVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {adminData.isVerified ? 'Verified' : 'Not Verified'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
