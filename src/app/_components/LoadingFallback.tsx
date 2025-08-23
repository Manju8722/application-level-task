import React from "react";

const LoadingFallback = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 border-solid rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading</h2>
          <p className="text-gray-600 text-sm">
            Please wait while we prepare your content...
          </p>
        </div>

        {/* Pulsing Dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingFallback;
