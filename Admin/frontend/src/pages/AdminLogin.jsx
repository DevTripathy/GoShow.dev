import React, { useState } from 'react'
import goshow from '../assets/goshow.png'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useContext } from 'react'

const AdminLogin = () => {

  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const [activeInput, setActiveInput] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  axios.defaults.withCredentials = true;


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
      toast.success(result.message);
    } else {
      toast.error(result.message || 'Login failed');
    }
    setLoading(false);
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-b from-black to bg-primary/20 relative'>

      <img src={goshow} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-42 cursor-pointer' />

      <div className="w-full max-w-md mx-auto bg-black/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border-3 border-primary">
        
        <h1 className='flex flex-row text-primary text-4xl font-bold text-center items-center justify-center mb-8'>
          Admin Login
        </h1>

        <form onSubmit={onSubmitHandler}>
         
          <div
            className={`mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-primary/10 border-2 transition-all duration-200 ${
              activeInput === 'email'
                ? 'border-primary'
                : 'border-transparent'
            }`}
          >
            <Mail className='w-auto h-5 text-primary' />
            <input
              type='email'
              placeholder='Email ID'
              required
              className='bg-transparent outline-none text-white w-full'
              onFocus={() => setActiveInput('email')}
              onBlur={() => setActiveInput(null)}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
         
          <div
            className={`mb-3 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-primary/10 border-2 transition-all duration-200 ${
              activeInput === 'password'
                ? 'border-primary'
                : 'border-transparent'
            }`}
          >
            <Lock className='w-auto h-5 text-primary' />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              required
              className='bg-transparent outline-none text-white w-full'
              onFocus={() => setActiveInput('password')}
              onBlur={() => setActiveInput(null)}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='text-primary hover:text-white transition-colors cursor-pointer'
            >
              {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
            </button>
          </div>

          <p 
            onClick={() => navigate('/admin-reset-password')}
            className='text-primary w-max text-start mb-6 text-sm transition-all duration-200 cursor-pointer hover:text-white'>Forgot Password ?
          </p>

          <button
            type="submit"
            disabled={loading}
            className='w-full py-2.5 rounded-full font-medium bg-primary-dull/90 text-white cursor-pointer hover:-translate-y-0.5 hover:bg-primary transition-all duration-300 disabled:opacity-50'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className='text-xs text-primary mt-5'>Note : If you have not registered before, it will register your account, otherwise it will login to your account.</p>
        </form>
            
      </div>
      
    </div>
  )
}

export default AdminLogin