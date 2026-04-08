import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import PopUpModal from './components/PopUpModal'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { BookingProvider } from './context/BookingContext'
import Login from './pages/Login.jsx'
import EmailVerify from './pages/EmailVerify.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showModal, setShowModal] = useState(false)
  const location = useLocation()
  const isLoginPage = location.pathname === '/user/login' || location.pathname === '/user/email-verify' || location.pathname === '/user/reset-password'

  return (
    <>
      <BookingProvider>
        <ToastContainer />
        {!isLoginPage && <Navbar onContactClick={() => setShowModal(true)} />}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/movies/:id' element={<MovieDetails />} />
          <Route path='/movies/:id/:date' element={<SeatLayout />} />
          <Route path='/my-bookings' element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          <Route path='/user/login' element={<Login />} />
          <Route path='/user/email-verify' element={<EmailVerify />} />
          <Route path='/user/reset-password' element={<ResetPassword />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
        {showModal && <PopUpModal onClose={() => setShowModal(false)} />}
        {!isLoginPage && <Footer />}
      </BookingProvider>

    </>
  )
}

export default App