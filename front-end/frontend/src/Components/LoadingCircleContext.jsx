import React from "react";
import "./LoadingCircleContext.css";

const LoadingCircleContext = () => {
  return (
    <div className='w-100 d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <div className="loader-5 center">
        <span></span>
      </div>
    </div>
  );
};

export default LoadingCircleContext;
