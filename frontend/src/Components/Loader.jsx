import React from 'react';
import "../style/loader.css";

const Loader = () => {
  return (
    <>
         <>
      <div className="w-full min-h-screen pt-16 pb-10 bg-slate-800 flex items-center justify-center z-50">
        <svg className="loaderAnimation" viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    </>
    </>
  )
}

export default Loader