import React, { useState } from 'react'
import { assets } from '../assets/assets'
import PopUpModal from './PopUpModal'

const Footer = () => {
  const [showModal, setShowModal] = useState(false)

  return (
     <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full text-gray-300">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
                <div className="md:max-w-150 mb">
                    <img alt="logo" className="h-auto w-22 lg:w-28" src="./src/assets/goshow.png" />
                    <p className="mt-6 text-sm text-justify mb-8 border-l-4 border-primary pl-3">
                        GoShow is your one-stop destination for booking movie tickets online with ease. Discover the latest movies, check showtimes, and reserve your seats instantly from the comfort of your home. Enjoy a seamless, secure, and hassle-free movie ticket booking experience with exclusive offers and real-time updates.
                    </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
                    <div>
                        <h2 className="font-semibold mb-5">Quick Links</h2>
                        <ul className="text-sm space-y-2">
                            <li className='hover:text-primary transition'><a href="#">Home</a></li>
                            <li className='hover:text-primary transition'><a href="#">Movies</a></li>
                            <li className='hover:text-primary transition'><a href="#">About us</a></li>
                            <li className='hover:text-primary transition'><a href="#">Privacy policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5">Get in touch</h2>
                        <ul className="text-sm space-y-2">
                            <li>
                              <button
                                className="hover:text-primary transition cursor-pointer"
                                onClick={() => setShowModal(true)}
                              >
                                Contact us
                              </button>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-sm pb-5">
                Copyright {new Date().getFullYear()} © <a href="/">GoShow</a>. All Right Reserved.
            </p>
            {showModal && (
              <PopUpModal onClose={() => setShowModal(false)} />
            )}
        </footer>
  )
}

export default Footer