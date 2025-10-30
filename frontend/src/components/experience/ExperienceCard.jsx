import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExperienceCard = ({ experience }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/experience/${experience._id}`);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={experience.images[0]} 
          alt={experience.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {experience.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
            Save ${experience.originalPrice - experience.price}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Location */}
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">
            {experience.title}
          </h3>
          <div className="flex items-center text-gray-600 text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {experience.location}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm font-medium text-gray-900">{experience.rating}</span>
            <span className="mx-1 text-gray-500">·</span>
            <span className="text-sm text-gray-500">{experience.reviewCount} reviews</span>
          </div>
        </div>

        {/* Duration and Category */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {experience.duration}
          </div>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
            {experience.category}
          </span>
        </div>

        {/* Price and Book Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">${experience.price}</span>
            {experience.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${experience.originalPrice}</span>
            )}
            <span className="text-sm text-gray-600">/person</span>
          </div>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-500 transition duration-200">
  Book Now
</button>

        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;