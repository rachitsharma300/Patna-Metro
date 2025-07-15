import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-4 mt-10">
      <div className="text-center text-sm">
        © {new Date().getFullYear()} Patna Metro Route Finder. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
