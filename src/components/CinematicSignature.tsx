"use client";

import React from 'react';

const CinematicSignature: React.FC = () => {
  return (
    <div className="footer-signature-container">
      <div className="signature-lines">
        <span className="line-green"></span>
        <span className="line-white"></span>
        <span className="line-red"></span>
      </div>
      <p className="apresto-text">A Presto</p>
    </div>
  );
};

export default CinematicSignature;
