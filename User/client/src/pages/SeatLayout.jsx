import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowRightIcon, ClockIcon, X } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCircle";
import PaymentSuccess from "../components/PaymentSuccess";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";
import axios from "axios";



const PaymentPopup = ({ open, onClose, selectedSeats, selectedTime, show, onPay, selectedShowPrice, holdExpiry }) => {
  if (!open) return null;
  const seatCount = selectedSeats.length;
  const price = selectedShowPrice;
  const total = seatCount * price;

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!holdExpiry) return;

    const interval = setInterval(() => {
      const seconds = Math.floor(
        (new Date(holdExpiry) - new Date()) / 1000
      );

      if (seconds <= 0) {
        clearInterval(interval);
        onClose();
        toast.error("Time expired!");
      } else {
        setTimeLeft(seconds);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [holdExpiry]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-black/30 text-white border-2 border-primary rounded-lg shadow-lg p-8 min-w-[320px] relative animate-scaleIn">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-primary text-xl cursor-pointer"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <p className="text-red-400 text-sm mb-2">
          ⏳ Time left: {timeLeft}s
        </p>

        <h2 className="text-xl font-bold mb-4 ">Confirm Your Booking</h2>
        <div className="mb-2">
          <span className="font-semibold">Movie:</span> {show?.movie?.title}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Time:</span> {isoTimeFormat(selectedTime?.time)}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Seats:</span> {selectedSeats.join(", ")}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Price per seat:</span> ₹{price}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Total:</span> ₹{total}
        </div>
        <button
          className="w-full bg-primary text-white py-2 rounded-full font-semibold hover:bg-primary-dull transition cursor-pointer"
          onClick={onPay}
        >
          Pay Now
        </button>
      </div>
      <style>
        {`
        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes scaleIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        `}
      </style>
    </div>
  );
};

const SeatLayout = () => {
  const { id, date } = useParams();

  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedShowPrice, setSelectedShowPrice] = useState(100);
  const [show, setShow] = useState(null);
  const [dateTime, setDateTime] = useState({});
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [holdExpiry, setHoldExpiry] = useState(null);

  const navigate = useNavigate();

  const { shows, isLoggedIn } = useAppContext();
  const backendUrl = import.meta.env.BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    setSelectedSeats([]);
    if (selectedTime) {
      getOccupiedSeats(selectedTime.showId);
    }
  }, [selectedTime]);

  const getShow = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/show/${id}`, {
        withCredentials: true
      });
      if (data.success) {
        setShow(data.movie);
        setDateTime(data.dateTime);
      } else {
        setShow(null);
        setDateTime({});
      }
    } catch (error) {
      console.error('Error fetching show:', error);
      setShow(null);
      setDateTime({});
    }
  };

  const getOccupiedSeats = async (showId) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/booking/seats/${showId}`, {
        withCredentials: true
      });
      if (data.success) {
        setOccupiedSeats(data.occupiedSeats);
      } else {
        setOccupiedSeats([]);
      }
    } catch (error) {
      console.error('Error fetching occupied seats:', error);
      setOccupiedSeats([]);
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select time first!!");
    }
    if (occupiedSeats.includes(seatId)) {
      return toast("This seat is already booked!");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 7) {
      return toast("You can only select 8 seats");
    }
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          const isOccupied = occupiedSeats.includes(seatId);
          const isSelected = selectedSeats.includes(seatId);
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 rounded border ${isOccupied
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : isSelected
                  ? "bg-primary text-white cursor-pointer"
                  : "border-primary/60 hover:bg-primary/20 cursor-pointer"
                }`}
              disabled={isOccupied}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  useEffect(() => {
    getShow();
  }, []);

  const handlePay = async () => {
    setShowPayment(false);
    try {
      // Fetch Razorpay key
      const { data: keyData } = await axios.get(`${backendUrl}/api/v1/getkey`, {
        withCredentials: true
      });

      if (!keyData.key) {
        toast.error("Unable to load payment gateway. Please try again.");
        return;
      }

      // Create Razorpay order
      const { data: orderData } = await axios.post(`${backendUrl}/api/v1/payment/process`, {
        amount: selectedSeats.length * selectedShowPrice
      }, {
        withCredentials: true
      });

      if (!orderData.success) {
        toast.error("Failed to create payment order. Please try again.");
        return;
      }

      const options = {
        key: keyData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "GoShow",
        description: "Movie Ticket Booking",
        order_id: orderData.order.id,
        method: 'upi',
        handler: async function (response) {
          // Payment successful, now create booking
          try {
            const { data: bookingData } = await axios.post(`${backendUrl}/api/booking/create`, {
              showId: selectedTime.showId,
              selectedSeats,
              amount: selectedSeats.length * selectedShowPrice,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            }, {
              withCredentials: true
            });

            if (bookingData.success) {
              setBookingDetails({
                bookingId: bookingData.bookingId,
                amount: selectedSeats.length * selectedShowPrice
              });
              setShowPaymentSuccess(true);
            } else {
              toast.error(bookingData.message || "Booking failed. Please try again.");
            }
          } catch (bookingError) {
            console.error("Booking error:", bookingError);
            toast.error("An error occurred during booking. Please try again.");
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: ""
        },
        notes: {
          address: "GoShow Movie Booking"
        },
        theme: {
          color: "#2408f7"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment error:", error);
      toast.error("An error occurred during payment. Please try again.");
    }
  };


  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
      {/* Available Timings */}
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">Available Timings</p>

        <div className="mt-5 space-y-1">
          {dateTime[date] && dateTime[date].length > 0 ? (
            dateTime[date].map((timeSlot) => (
              <button
                key={timeSlot.showId}
                onClick={() => {
                  setSelectedTime({ time: timeSlot.time, showId: timeSlot.showId });
                  setSelectedShowPrice(timeSlot.price || 100);
                }}
                className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.showId === timeSlot.showId
                  ? "bg-primary text-white "
                  : "hover:bg-primary/20"
                  }`}
              >
                <ClockIcon className="w-4 h-4" />
                <p className="text-sm ">{isoTimeFormat(timeSlot.time)}</p>
              </button>
            ))
          ) : (
            <p className="px-6 text-sm text-gray-400">No shows available for this date</p>
          )}
        </div>
      </div>

      {/* Seats Layout */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />

        <h1 className="text-2xl font-semibold mb-4">Select Your Seats</h1>

        {/* Price Section */}
        {selectedSeats.length > 0 && (
          <div className="mb-6 bg-primary/10 border border-primary/20 rounded-lg p-4 w-full max-w-sm">
            <div className="flex justify-between items-center text-sm">
              <span>Selected Seats: {selectedSeats.length} </span>
              <span className="text-primary font-bold">₹{selectedSeats.length * selectedShowPrice}</span>
            </div>
          </div>
        )}

        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>

          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>
                {group.map((row) => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={async () => {
            if (!selectedTime) return toast("Please select a time slot!");
            if (selectedSeats.length === 0) return toast("Please select at least one seat!");
            if (!isLoggedIn) {
              navigate('/user/login');
              return;
            }
            try {
              const { data } = await axios.post(
                `${backendUrl}/api/booking/hold`,
                {
                  showId: selectedTime.showId,
                  selectedSeats
                },
                { withCredentials: true }
              );

              if (!data.success) {
                return toast.error(data.message);
              }

              // store expiry for timer
              setHoldExpiry(data.expiry);

              setShowPayment(true);

            } catch (err) {
              toast.error("Failed to hold seats");
            }
          }}
          className="flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95"
        >
          Proceed to Checkout
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
        </button>
      </div>

      <PaymentPopup
        open={showPayment}
        onClose={() => setShowPayment(false)}
        selectedSeats={selectedSeats}
        selectedTime={selectedTime}
        show={show}
        onPay={handlePay}
        selectedShowPrice={selectedShowPrice}
         holdExpiry={holdExpiry}
      />

      {showPaymentSuccess && (
        <PaymentSuccess
          bookingId={bookingDetails?.bookingId}
          amount={bookingDetails?.amount}
          onClose={() => {
            setShowPaymentSuccess(false);
            navigate("/my-bookings");
          }}
        />
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default SeatLayout;
