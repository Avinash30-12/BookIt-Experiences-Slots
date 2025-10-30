import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import ExperienceDetailPage from './pages/ExperienceDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import BookingResultPage from './pages/BookingResultPage';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <Router>
      <Layout onSearch={setSearchTerm}>
        <main>
          <Routes>
            <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
            <Route path="/experience/:id" element={<ExperienceDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/booking-result" element={<BookingResultPage />} />
          </Routes>
        </main>
      </Layout>
    </Router>
  );
}

export default App;
