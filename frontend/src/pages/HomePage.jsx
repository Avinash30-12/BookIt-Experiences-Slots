// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import ExperienceGrid from '../components/experience/ExperienceGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { experienceAPI } from '../services/api';

const HomePage = ({ searchTerm }) => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await experienceAPI.getAll();
        setExperiences(response.data.data);
      } catch (err) {
        setError('Failed to load experiences');
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  // Use global search term (from props)
  const filteredExperiences = searchTerm
    ? experiences.filter(exp =>
        exp.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : experiences;

  return (
    <div className="min-h-screen bg-white">
      {/* Experiences Grid */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Find Your Next Adventure</h1>
        {error ? (
          <div className="text-red-600 py-8">{error}</div>
        ) : (
          <ExperienceGrid experiences={filteredExperiences} loading={loading} />
        )}
      </main>
      {/* Features Section */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16 grid gap-8 md:grid-cols-3 text-center">
          <div>
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Hosts</h3>
            <p className="text-gray-600 text-base">Carefully vetted adventures from trustworthy locals.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="4" y="6" width="16" height="14" rx="2" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 2v4M8 2v4"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Confirmation</h3>
            <p className="text-gray-600 text-base">Book experiences and get immediate confirmation.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v-6m0-6v.01"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-base">Anytime, anywhere, get help from our support team.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
