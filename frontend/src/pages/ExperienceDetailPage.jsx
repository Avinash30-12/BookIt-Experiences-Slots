import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { experienceAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ExperienceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [qty, setQty] = useState(1);

  const TAX = 59;

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const response = await experienceAPI.getById(id);
        setExperience(response.data.data);
      } catch (err) {
        setError('Failed to load experience details');
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">{error || 'Experience not found'}</div>
          <button
            onClick={() => navigate('/')}
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Fallback and extraction
  const experienceData = experience.experience || experience;
  const imageUrl = experienceData.images?.[0] ||
    'https://images.unsplash.com/photo-1579033462043-0f11a7862f7d?w=800';
  const slots = experience.slots || []; // Array of slots with date + startTime + endTime + capacity + bookedCount
  const basePrice = experienceData.price || 999;

  // Group slots by date
  const slotsByDate = slots.reduce((acc, slot) => {
    const date = new Date(slot.date).toISOString().split('T')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(slot);
    return acc;
  }, {});

  const availableDates = Object.keys(slotsByDate);

  const handleBook = () => {
    if (!selectedDate || !selectedSlot) return;

    navigate('/checkout', {
      state: {
        experience,
        slot: selectedSlot,
        selectedDate,
        qty,
        subtotal: selectedSlot.price * qty,
        taxAmount: TAX,
        total: selectedSlot.price * qty + TAX,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 p-10 pt-0 flex flex-col">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-sm text-black font-semibold mb-8 mt-8"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
              </svg>
              Details
            </button>
            <div className="w-full h-72 rounded-xl overflow-hidden mb-8">
              <img
                src={imageUrl}
                alt={experienceData.title}
                className="object-cover w-full h-full"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{experienceData.title}</h1>
            <p className="text-gray-700 mb-6">{experienceData.description}</p>
            {/* Choose Date */}
            <div className="mb-6">
              <span className="block font-semibold text-gray-800 mb-2">Choose date</span>
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4" style={{ WebkitOverflowScrolling: 'touch' }}>
  {availableDates.slice(0, 5).map(date => (
    <button
      key={date}
      onClick={() => {
        setSelectedDate(date);
        setSelectedSlot(null);
      }}
      className={`px-5 py-2 rounded-lg border font-semibold text-md transition whitespace-nowrap ${
        selectedDate === date
          ? 'bg-yellow-400 text-black border-yellow-400'
          : 'bg-white border-gray-300 text-gray-800 hover:border-yellow-400'
      }`}
    >
      {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
    </button>
  ))}
</div>

            </div>
            {/* Choose Time Slot */}
            {selectedDate && (
              <div className="mb-8">
                <span className="block font-semibold text-gray-800 mb-2">Choose time slot</span>
                <div className="flex gap-2 flex-wrap">
                  {slotsByDate[selectedDate].map(slot => {
                    const slotsLeft = slot.capacity - slot.bookedCount;
                    const isSoldOut = slotsLeft <= 0;

                    return (
                      <div key={slot._id || slot.startTime} className="flex flex-col items-center">
                        <button
                          onClick={() => !isSoldOut && setSelectedSlot(slot)}
                          disabled={isSoldOut}
                          className={`px-4 py-2 rounded-lg border transition font-medium text-sm mb-1 ${
                            isSoldOut
                              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                              : (selectedSlot?.startTime === slot.startTime
                                ? 'bg-yellow-400 text-black border-yellow-400'
                                : 'bg-white border-gray-300 text-gray-800 hover:border-yellow-400')
                          }`}
                        >
                          {slot.startTime} - {slot.endTime}
                        </button>
                        <span className={`text-xs font-semibold ${isSoldOut ? 'text-red-500' : 'text-green-600'}`}>
                          {isSoldOut ? 'Sold Out' : `${slotsLeft} left`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          
          {/* RIGHT SIDEBAR BOOKING */}
          <div className="bg-gray-50 p-10 flex flex-col justify-between border-l border-gray-200">
            <div className="mb-8">
              <div className="font-bold text-xl text-gray-900 mb-3">Starts at ₹{basePrice}</div>
              <div className="mb-6">
                <span className="font-semibold text-gray-800 mb-2 block">Guests</span>
                <div className="flex items-center gap-3">
                  <button
                    className="px-3 py-2 rounded bg-gray-300 text-lg font-bold"
                    onClick={() => setQty(Math.max(qty - 1, 1))}
                    disabled={qty <= 1}
                  >-</button>
                  <span className="text-lg font-medium text-gray-800">{qty}</span>
                  <button
                    className="px-3 py-2 rounded bg-gray-300 text-lg font-bold"
                    onClick={() => setQty(qty + 1)}
                  >+</button>
                </div>
              </div>
              <div className="mb-6 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{basePrice * qty}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes</span>
                  <span>₹{TAX}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span>₹{basePrice * qty + TAX}</span>
                </div>
              </div>
              <button
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  selectedDate && selectedSlot
                    ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!selectedDate || !selectedSlot}
                onClick={handleBook}
              >
                Confirm
              </button>
            </div>
            <div className="mt-6 text-xs text-gray-500 text-center">
              Inclusive of taxes. Select date & time to proceed.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailPage;
