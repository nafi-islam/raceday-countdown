import React, { useState, useEffect } from 'react';

function Countdown({ raceDate }) {
  const calculateTimeLeft = () => {
    const raceDateTime = new Date(raceDate).getTime(); // Timestamp of the race date
    const currentTime = new Date().getTime(); // Current timestamp
    const difference = raceDateTime - currentTime; // Difference in ms

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft.days = Math.floor(difference / (1000 * 60 * 60 * 24));
      timeLeft.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      timeLeft.minutes = Math.floor((difference / 1000 / 60) % 60);
      timeLeft.seconds = Math.floor((difference / 1000) % 60);
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, [raceDate]); // Re-run the effect if the raceDate changes

  return (
    <div>
      {raceDate ? (
        <div className="Countdown">
          <h2>Countdown to Race</h2>
          <p>
            {timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes}{' '}
            Minutes {timeLeft.seconds} Seconds
          </p>
        </div>
      ) : (
        <p>Race date not available.</p>
      )}
    </div>
  );
}

export default Countdown;
