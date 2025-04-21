// src/components/LoadingIndicator.tsx
import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex items-center justify-center h-svh">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl rounded-2xl p-8 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-3">
            <div className="w-4 h-4 bg-white rounded-full animate-bounce shadow-lg" 
              style={{ animationDelay: '0s' }} />
            <div className="w-4 h-4 bg-white rounded-full animate-bounce shadow-lg" 
              style={{ animationDelay: '0.1s' }} />
            <div className="w-4 h-4 bg-white rounded-full animate-bounce shadow-lg" 
              style={{ animationDelay: '0.2s' }} />
          </div>
          <p className="text-white text-sm font-medium animate-pulse">
            Loading your AI assistant...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;