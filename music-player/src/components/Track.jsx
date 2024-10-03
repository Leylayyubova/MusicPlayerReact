import React from 'react';

function Track({ title, artist }) {
  return (
    <div className="track">
      <h2>{title}</h2>
      <h3>{artist}</h3>
    </div>
  );
}

export default Track;
