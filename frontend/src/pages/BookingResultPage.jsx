import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Utility: fallback display if field is empty
const safe = (value, fallback = '–') => value !== undefined && value !== null ? value : fallback;

const BookingResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { success, booking, error } = location.state || {};

  // Graceful fallback
  if (!location.state) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">No booking result information found</div>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Check for Experience/Slot title fallback
  const experienceTitle = booking?.experienceId?.title || booking?.experienceId || '–';
  const slotDate = booking?.slotId?.date ? new Date(booking.slotId.date).toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
  }) : '–';
  const slotTime = safe(booking?.slotId?.startTime);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          {success ? (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for your booking. Your experience has been confirmed.
              </p>

              {booking && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                  <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking Reference:</span>
                      <span className="font-mono font-semibold">{safe(booking.bookingReference)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience:</span>
                      <span>{experienceTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time:</span>
                      <span>
                        {slotDate} at {slotTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Participants:</span>
                      <span>{safe(booking.participants)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Paid:</span>
                      <span className="font-semibold">₹{safe(booking.finalPrice)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <button
                  onClick={() => navigate('/')}
                  className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => window.print()}
                  className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
                >
                  Print Confirmation
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Failed</h1>
              <p className="text-gray-600 mb-6">
                {error || 'There was an issue processing your booking. Please try again.'}
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => navigate('/')}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
                >
                  Try Again
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingResultPage;
