// src/Components/Footer.tsx
import React from 'react';

// Get the current year
const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      © {currentYear} بناء .جميع الحقوق محفوظه.
    </footer>
  );
};

export default Footer;
