import React, { useState } from 'react';

const HeaderBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <header className="w-full border-b border-gray-100 bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center sm:justify-between gap-3">
        {/* Desktop/tablet: flex-row, mobile: flex-col, gap between logo/search */}
        <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <span className="inline-block">
            <img
              src="/logo.jpeg"
              alt="Highway Delite Logo"
              className="w-14 h-14 object-contain"
            />
          </span>
          <span className="sm:inline text-lg font-bold">Highway Delite</span>
        </div>

        <form
          onSubmit={handleSearch}
          className="w-full sm:w-auto flex items-center gap-3 bg-gray-100 rounded-xl px-3 py-2"
        >
          <input
            type="text"
            placeholder="Search experiences"
            value={searchTerm}
            onChange={handleInputChange}
            className="bg-transparent w-full outline-none text-gray-700 border-0 placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm px-5 py-2 rounded-lg font-semibold transition"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default HeaderBar;
