// LoadingScreen.js
import React from 'react';
import { PuffLoader } from 'react-spinners';

function LoadingScreen () {
  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          // background: "rgba(255,255,255,0.8)",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <PuffLoader color="#000B58" />
        {/* <p className="mt-3">Loading, please wait...</p> */}
      </div>
    </>
  )
}

export default LoadingScreen