import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookingAPI, promoAPI } from '../services/api';

const TAX = 59;

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Read from navigation state or localStorage for refresh support.
  const storedData = JSON.parse(localStorage.getItem('checkoutData') || '{}');
  const {
    experience,
    slot,
    selectedDate,
    qty = 1,
    subtotal = slot?.price ? slot.price * qty : 0,
    taxAmount = TAX,
    total = subtotal + TAX
  } =
    location.state || storedData || {};

  // Persist data for reload
  useEffect(() => {
    if (location.state) {
      localStorage.setItem('checkoutData', JSON.stringify(location.state));
    }
  }, [location.state]);

  // Demo values for filled state if you want Figma slide 6 look (optional)
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'test@test.com',
    promoCode: '',
    agree: true
  });
  const [promoValid, setPromoValid] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!experience || !slot) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">No booking information found</div>
          <button
            onClick={() => {
              localStorage.removeItem('checkoutData');
              navigate('/');
            }}
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Handle form input
  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Validate Promo Code
  const validatePromoCode = async () => {
    if (!formData.promoCode) return;
    try {
      const response = await promoAPI.validate(formData.promoCode, subtotal);
      if (response.data.isValid) {
        setPromoValid(true);
        setDiscount(response.data.data.discountAmount);
      } else {
        setPromoValid(false);
        setDiscount(0);
      }
    } catch {
      setPromoValid(false);
      setDiscount(0);
    }
  };

  const finalPrice = subtotal - discount + taxAmount;

  // Handle Booking Submit
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.agree) return;
  setLoading(true);
  try {
    const bookingData = {
      slotId: slot._id,
      userName: formData.fullName,
      userEmail: formData.email,
      participants: qty,
      promoCode: formData.promoCode,
      originalPrice: subtotal,
      discountAmount: discount,
      finalPrice
    };
    console.log('Booking Payload:', bookingData);
    const response = await bookingAPI.create(bookingData);
    if (response.data.success) {
      localStorage.removeItem('checkoutData');
      navigate('/booking-result', {
        state: { success: true, booking: response.data.data }
      });
    }
  } catch (error) {
    navigate('/booking-result', {
      state: { success: false, error: error.response?.data?.message || 'Booking failed' }
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT: FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col justify-between"
          >
            <div>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex items-center text-black font-semibold mb-8"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Checkout
              </button>

              {/* Full Name */}
              <div className="mb-6">
                <label className="block font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none"
                  placeholder="Your email"
                />
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block font-medium text-gray-700 mb-1">Promo Code</label>
                <div className="flex">
                  <input
                    type="text"
                    name="promoCode"
                    value={formData.promoCode}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 rounded-l-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none"
                    placeholder="Enter promo code"
                  />
                  <button
                    type="button"
                    onClick={validatePromoCode}
                    className="bg-black text-white px-6 py-3 font-semibold rounded-r-lg hover:bg-gray-800 transition ml-[-1px]"
                  >
                    Apply
                  </button>
                </div>
                {promoValid === true && (
                  <p className="text-green-600 text-sm mt-1">Promo code applied!</p>
                )}
                {promoValid === false && (
                  <p className="text-red-600 text-sm mt-1">Invalid promo code</p>
                )}
              </div>

              {/* Checkbox */}
              <div className="mt-4 mb-2 flex items-center">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleInputChange}
                  className="mr-2 w-5 h-5 rounded border border-gray-400 text-black focus:ring-yellow-400"
                  required
                />
                <label htmlFor="agree" className="text-gray-700 text-sm">
                  I agree to the terms and safety policy
                </label>
              </div>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              disabled={loading || !formData.agree}
              className={`w-full py-3 rounded-lg font-bold text-lg mt-8 transition ${
                loading || !formData.agree
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-yellow-400 text-black hover:bg-yellow-500'
              }`}
            >
              {loading ? 'Processing...' : `Pay and Confirm`}
            </button>
          </form>

          {/* RIGHT: SUMMARY */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 h-fit flex flex-col justify-start">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            {/* All booking details line by line, label left value right */}
            <div className="mb-6 space-y-3">
              <p className="text-lg font-semibold text-gray-900">{experience?.title || 'Experience'}</p>
              <p className="text-sm text-gray-700">{experience?.location}</p>
              <div className="flex items-center justify-between text-sm text-gray-800">
                <span className="font-medium">Date:</span>
                <span>
                  {selectedDate &&
                    new Date(selectedDate).toLocaleDateString('en-IN', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-800">
                <span className="font-medium">Time:</span>
                <span>
                  {slot?.startTime} - {slot?.endTime}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-800">
                <span className="font-medium">Qty:</span>
                <span>{qty}</span>
              </div>
            </div>

            {/* Price breakdown, each on its own line */}
            <div className="space-y-2">
              <div className="flex justify-between text-base text-gray-700">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-base text-gray-700">
                <span>Taxes</span>
                <span>₹{taxAmount}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-base">
                  <span>Discount</span>
                  <span className="text-green-600">-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg mt-4 text-gray-900">
                <span>Total</span>
                <span>₹{finalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
