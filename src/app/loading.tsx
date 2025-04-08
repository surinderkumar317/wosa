import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex space-x-2 justify-center items-center">
        <div className="h-4 w-4 bg-red-600 rounded-full animate-bounce"></div>
        <div className="h-4 w-4 bg-red-600 rounded-full animate-bounce delay-150"></div>
        <div className="h-4 w-4 bg-red-600 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default Loader;