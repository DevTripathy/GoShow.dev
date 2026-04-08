import React, { useState, useContext } from 'react'
import goshow from '../assets/goshow.png'
import { Mail, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext.jsx'

const ResetPassword = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const { backendUrl } = useContext(AppContext);

  const [email, setEmail] = useState('')
  const [activeInput, setActiveInput] = useState(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOTPVerified, setIsOTPVerified] = useState(false);


  const inputRefs =  React.useRef([]);
  
    const handleInput = (e, index) => {
      if(e.target.value.length > 0 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  
    const handlekeyDown = (e, index) => {
      if(e.key === 'Backspace' && index > 0 && e.target.value.length === 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  
    const handlePaste = (e) => {
      const value = e.clipboardData.getData('text');
      const pasteArray = value.split('').slice(0, 6);
      pasteArray.forEach((char, index) => {
        if(inputRefs.current[index]) {
          inputRefs.current[index].value = char;
        }
      });
    }

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/user/send-password-reset-email`, { email });
      if (data.success) {
        toast.success('OTP sent to your email');
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const otpCode = inputRefs.current.map(input => input.value).join('');
    if (otpCode.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP');
      return;
    }
    setOtp(otpCode);
    setIsOTPVerified(true);
  }

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/user/reset-password`, { email, otp, newPassword: password });
      if (data.success) {
        toast.success('Password reset successfully');
        navigate('/user/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-b from-black to bg-primary/20 relative'>
      <img src={goshow} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-35 cursor-pointer' />

    {!isEmailSent &&

      <form onSubmit={onSubmitEmail} className="w-full max-w-md mx-auto bg-black/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border-3 border-primary">
        <h1 className='text-primary text-[2rem] font-semibold text-center mb-2 '>Reset Password</h1>
        <p className='text-sm text-center text-white mb-6'>Enter your registered Email ID.</p>

        <div
            className={`mb-8 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-primary/10 border-2 transition-all duration-200 ${
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

        <button type='submit' className='w-full py-2.5 rounded-full font-medium bg-primary-dull/90 text-white cursor-pointer hover:-translate-y-0.5  hover:bg-primary transition-all duration-300'>Submit</button>

      </form>
    }

    {isEmailSent && !isOTPVerified &&

       <form onSubmit={onSubmitOTP} className="w-full max-w-md mx-auto bg-black/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border-3 border-primary">

        <h1 className='text-primary text-[2rem] font-semibold text-center mb-2'>Reset Password OTP</h1>
        <p className='text-sm text-center text-white mb-6'>Please enter the 6-digit code sent to your email.</p>

        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              ref={e => inputRefs.current[index] = e}
              className="w-12 h-12 rounded-2xl text-center text-2xl font-semibold border-2 border-primary bg-black/40 outline-none focus:border-white text-white"
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handlekeyDown(e, index)}
            />
          ))}
        </div>

        <button type='submit' className='w-full py-2.5 rounded-full font-medium bg-primary-dull/90 text-white cursor-pointer hover:-translate-y-0.5  hover:bg-primary transition-all duration-300'>Submit</button>
      </form>
    }

    {isEmailSent && isOTPVerified &&

      <form onSubmit={onSubmitPassword} className="w-full max-w-md mx-auto bg-black/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border-3 border-primary">
        <h1 className='text-primary text-[2rem] font-semibold text-center mb-2'>Set New Password</h1>
        <p className='text-sm text-center text-white mb-6'>Enter your new password.</p>
        <div
            className={`mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-primary/10 border-2 transition-all duration-200 ${
              activeInput === 'password'
                ? 'border-primary'
                : 'border-transparent'
            }`}
          >
            <Lock className='w-auto h-5 text-primary' />
            <input
              type='password'
              placeholder='New Password'
              required
              className='bg-transparent outline-none text-white w-full'
              onFocus={() => setActiveInput('password')}
              onBlur={() => setActiveInput(null)}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div
            className={`mb-8 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-primary/10 border-2 transition-all duration-200 ${
              activeInput === 'confirmPassword'
                ? 'border-primary'
                : 'border-transparent'
            }`}
          >
            <Lock className='w-auto h-5 text-primary' />
            <input
              type='password'
              placeholder='Confirm Password'
              required
              className='bg-transparent outline-none text-white w-full'
              onFocus={() => setActiveInput('confirmPassword')}
              onBlur={() => setActiveInput(null)}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>

        <button type='submit' className='w-full py-2.5 rounded-full font-medium bg-primary-dull/90 text-white cursor-pointer hover:-translate-y-0.5  hover:bg-primary transition-all duration-300'>Submit</button>
      </form>
    }
    </div>
  )
}

export default ResetPassword