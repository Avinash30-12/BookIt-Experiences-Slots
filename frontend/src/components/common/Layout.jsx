// src/components/common/Layout.js
import React from 'react';
import HeaderBar from './Header';

const Layout = ({ children, onSearch }) => (
  <div>
    <HeaderBar onSearch={onSearch} />
    {children}
  </div>
);

export default Layout;
