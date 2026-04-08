import React, { useEffect } from 'react';
import '../styles/PaymentSuccess.css';

const PaymentSuccess = ({ bookingId, amount, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 3000); // Auto-close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        <h1 className="payment-success-title">Payment Successful!</h1>
        <p className="payment-success-message">
          Your booking has been confirmed. Enjoy the show!
        </p>
        {bookingId && (
          <div className="payment-success-reference">
            <strong>Booking Reference:</strong> {bookingId}
          </div>
        )}
        {amount && (
          <div className="payment-success-reference">
            <strong>Total Amount:</strong> ₹{amount}
          </div>
        )}
        <p className="text-sm text-gray-500 mt-4">Redirecting to My Bookings...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
