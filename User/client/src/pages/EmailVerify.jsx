import React, { useContext, useEffect } from 'react'
import goshow from '../assets/goshow.png'
import { Lock, Mail, User } from 'lucide-react'
import BlurCircle from '../components/BlurCircle'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext.jsx'
import { useNavigate } from 'react-router-dom'

const EmailVerify = () => {

  const {backendUrl, isLoggedIn, userData, getUserDetails, setIsLoggedIn} = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

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

  const sendVerificationOtp = async () => {
    try {
      const {data} = await axios.post(backendUrl + '/api/auth/user/send-verification-email', {});
      if(data.success) {
        toast.success('OTP sent to your email');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const code = inputRefs.current.map(input => input.value).join('');
      
      const {data} = await axios.post(backendUrl + '/api/auth/user/verify-email', {otp: code});

      if(data.success) {
        toast.success('Login Successful');
        setIsLoggedIn(true);
        getUserDetails();
        navigate('/');
      }
      else
      {
        toast.error(data.message);
        // Optionally resend OTP if expired or invalid
        // sendVerificationOtp();
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/user/login');
    } else if (userData && userData.isVerified) {
      navigate('/');
    }
  }, [isLoggedIn, userData, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      sendVerificationOtp();
    }
  }, [isLoggedIn]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-b from-black to bg-primary/20 relative'>
      <BlurCircle top='80px' right='100px'/>
      <BlurCircle bottom='80px' left='100px'/>
      <img src={goshow} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-35 cursor-pointer' />

      <form onSubmit={onSubmitHandler} className="w-full max-w-md mx-auto bg-black/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border-3 border-primary">
        
        <h1 className='text-primary text-[2rem] font-semibold text-center mb-2'>Email Verification</h1>
        <p className='text-sm text-center text-white mb-6'>Please enter the verification code sent to your email.</p>

        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input 
              key={index}
              type="text"
              maxLength={1}
              ref={e => inputRefs.current[index] = e}
              className="w-12 h-12 rounded-2xl text-center text-2xl font-semibold border-2 border-primary bg-black/60 outline-none focus:border-white text-white"
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handlekeyDown(e, index)}
            />
          ))}
        </div>

        <div className='flex justify-center gap-4'>
          <button type='button' onClick={sendVerificationOtp} className='py-2.5 px-4 rounded-full font-medium bg-gray-600 text-white cursor-pointer hover:bg-gray-500 transition-all duration-300'>Resend OTP</button>
          <button type='submit' className='py-2.5 px-4 rounded-full font-medium bg-primary-dull/90 text-white cursor-pointer hover:-translate-y-0.5 hover:bg-primary transition-all duration-300'>Verify Email</button>
        </div>
      </form>
    </div>
  )
}

export default EmailVerify