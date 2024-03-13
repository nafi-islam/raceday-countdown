import React from 'react';

function RaceInfo({ race }) {
  // A function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="RaceInfo">
      {race.name ? (
        <div>
          <h1>Next Race: {race.name}</h1>
          <p>Circuit: {race.circuit}</p>
          <p>Location: {race.country}</p>
          <p>Date: {formatDate(race.date)}</p>
        </div>
      ) : (
        <p>Next race information is not available.</p>
      )}
    </div>
  );
}

export default RaceInfo;
