import React from "react";

export default function Loader() {
  return (
    <>
      <div className="loader-container">
        <div className="loader"></div>
        <div
          className="spinner-border container d-flex justify-content-center align-items-center"
          role="status"
        >
          <span className="sr-only"></span>
        </div>
      </div>
    </>
  );
}
