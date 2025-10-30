import React from 'react';
import ExperienceCard from './ExperienceCard';
import LoadingSpinner from '../common/LoadingSpinner';

const ExperienceGrid = ({ experiences, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!experiences || experiences.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No experiences found</h3>
        <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {experiences.map((experience) => (
        <ExperienceCard 
          key={experience._id} 
          experience={experience.experience || experience} 
        />
      ))}
    </div>
  );
};

export default ExperienceGrid;