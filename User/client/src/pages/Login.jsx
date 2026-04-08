import React, { useContext, useState } from 'react'
import goshow from '../assets/goshow.png'
import { Lock, Mail, User, Eye, EyeOff } from 'lucide-react'
import { data, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext.jsx'
import { useEffect } from 'react'



const Login = () => {

  const navigate = useNavigate();
  axios.defaults.withCredentials = true
  const {backendUrl, setIsLoggedIn, getUserDetails} = useContext(AppContext);

  const [activeInput, setActiveInput] = useState(null)
  const [state, setState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isVerified, setIsVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async(e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if(state === 'Login'){
        const {data} = await axios.post(`${backendUrl}/api/auth/user/login`, {email, password});
        if(data.success){
          if(!data.isVerified){
            setIsLoggedIn(true);
            navigate('/user/email-verify');
          }else{
            setIsLoggedIn(true);
            getUserDetails();
            toast.success('Login Successful');
            navigate('/');
          }
        }else{
          toast.error(data.message);
        }
      } else {
        const {data} = await axios.post(`${backendUrl}/api/auth/user/signup`, {fullname: name, email, password});
        if(data.success){
          toast.success('SignUp Successful');
          navigate('/user/login');
          setState('Login');
        }else{
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-b from-black to bg-primary/20 relative'>

      <img src={goshow} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-42 cursor-pointer' />

      <div className="w-full max-w-md mx-auto bg-black/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border-3 border-primary">
        
        <h1 className='flex console.errorflex-row text-primary text-4xl font-bold text-center items-center justify-center mb-8'>
          {state === 'Login' ? 'Login' : 'SignUp'}
        </h1>

        <form onSubmit={ onSubmitHandler }>
         {state === 'SignUp' && (
            <div
            className={`mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-primary/10 border-2 transition-all duration-200 ${
              activeInput === 'fullname'
                ? 'border-primary'
                : 'border-transparent'
            }`}
            >
            <User className='w-auto h-5 text-primary' />
            <input
              type='text'
              placeholder='Full Name'
              required
              className='bg-transparent outline-none text-white w-full'
              onFocus={() => setActiveInput('fullname')}
              onBlur={() => setActiveInput(null)}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
         )}

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
            onClick={() => navigate('/user/reset-password')}
            className='text-primary w-max text-start mb-6 text-sm transition-all duration-200 cursor-pointer hover:text-white'>Forgot Password ?
          </p>

           
          <button type='submit'
            className='w-full py-2.5 rounded-full font-medium bg-primary-dull/90 text-white cursor-pointer hover:-translate-y-0.5  hover:bg-primary transition-all duration-300'
            >{state}</button>
        </form>

        {state === 'Login' ? (
          <p className='text-white py-2.5 text-sm mt-2 text-center'>
            Don't have an account ?
            <span
              className='text-primary text-sm ml-1.5 transition-all duration-200 cursor-pointer underline hover:text-white'
              onClick={() => setState('SignUp')}
            >
              SignUp
            </span>
          </p>
        ) : (
          <p className='text-white py-2.5 text-sm mt-2 text-center'>
            Already have an account ?
            <span
              className='text-primary text-sm ml-1.5 transition-all duration-200 cursor-pointer underline hover:text-white'
              onClick={() => setState('Login')}
            >
              Login
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

export default Login;