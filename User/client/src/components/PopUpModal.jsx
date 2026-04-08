import React, { useState, useEffect } from 'react'
import { XIcon, Phone, Mail, Facebook, MessageCircle } from 'lucide-react'

// Add popup and closing animation styles
const popupAnimation = `
@keyframes popup {
  0% {
    transform: scale(0.7);
    opacity: 0;
  }
  80% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes popdown {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.7);
    opacity: 0;
  }
}
.popup-animate {
  animation: popup 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.popdown-animate {
  animation: popdown 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
`

const PopUpModal = ({ onClose, children }) => {
  const [closing, setClosing] = useState(false)

  // Handles modal close with animation
  const handleClose = () => {
    setClosing(true)
  }

  // When closing animation ends, call onClose
  useEffect(() => {
    if (!closing) return
    const timer = setTimeout(() => {
      onClose()
    }, 250) // match popdown animation duration
    return () => clearTimeout(timer)
  }, [closing, onClose])

  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  return (
    <>
      <style>{popupAnimation}</style>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      >
        <div
          className={`relative w-full max-w-lg max-h-[70vh] bg-black/70 border-2 border-primary rounded-xl shadow-lg flex flex-col justify-start items-center p-8 md:p-12 ${
            closing ? 'popdown-animate' : 'popup-animate'
          }`}
          style={{ maxWidth: '500px', width: '90%', minHeight: '300px' }}
          onClick={handleModalClick}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition cursor-pointer"
            onClick={handleClose}
            aria-label="Close"
          >
            <XIcon className="w-7 h-7" />
          </button>
          <div className="w-full flex flex-col items-center gap-6">
            {/* Heading at the top */}
            <h1 className="text-2xl lg:text-3xl font-bold mb-2 self-center text-primary-dull">Contact Us</h1>
            {/* Grid of buttons */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 w-full mt-2">
              <button className="flex items-center gap-3 bg-primary/40 border border-primary rounded-lg px-2 py-2 shadow cursor-pointer hover:bg-primary transition">
                <span className="bg-primary text-white rounded-md p-2 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </span>
                <span className="font-medium">Call</span>
              </button>
              <button className="flex items-center gap-3 bg-primary/40 border border-primary rounded-lg px-2 py-2 shadow cursor-pointer hover:bg-primary transition">
                <span className="bg-primary text-white rounded-md p-2 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </span>
                <span className="font-medium">Email</span>
              </button>
              <button className="flex items-center gap-3  bg-primary/40 border border-primary rounded-lg px-2 py-2 shadow cursor-pointer hover:bg-primary transition">
                <span className="bg-primary text-white rounded-md p-2 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </span>
                <span className="font-medium">WhatsApp</span>
              </button>
              <button className="flex items-center gap-3  bg-primary/40 border border-primary rounded-lg px-2 py-2 shadow cursor-pointer hover:bg-primary transition">
                <span className="bg-primary transition text-white rounded-md p-2 flex items-center justify-center">
                  <Facebook className="w-5 h-5" />
                </span>
                <span className="font-medium">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PopUpModal