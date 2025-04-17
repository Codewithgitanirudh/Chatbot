// src/components/Header.tsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 fixed w-full z-10">
      <div className="max-w-4xl mx-auto flex items-center">
        <h1 className="text-xl font-semibold text-gray-800">AI Assistant</h1>
        <div className="flex-grow" />
        <div className="bg-blue-100 px-3 py-1 rounded-full">
          <span className="text-sm text-blue-800">Powered by Gemini</span>
        </div>
      </div>
    </header>
  );
};

export default Header;