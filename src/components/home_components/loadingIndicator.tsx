// src/components/LoadingIndicator.tsx
import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-white shadow-md rounded-lg p-4 max-w-[80%]">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;