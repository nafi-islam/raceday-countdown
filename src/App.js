import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';
import RaceInfo from './RaceInfo';
import Podium from './Podium';
import './App.css';

function App() {
  const [nextRace, setNextRace] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNextRace = async () => {
      try {
        const currentYear = new Date().getFullYear();
        const response = await fetch(`http://ergast.com/api/f1/${currentYear}.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch the race data');
        }
        const data = await response.json();
        const races = data.MRData.RaceTable.Races;
        const upcomingRaces = races.filter(race => new Date(race.date) > new Date());
        const nextRace = upcomingRaces.length > 0 ? upcomingRaces[0] : null;

        if (nextRace) {
          setNextRace({
            name: nextRace.raceName,
            circuit: nextRace.Circuit.circuitName,
            country: nextRace.Circuit.Location.country,
            date: nextRace.date,
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNextRace();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <RaceInfo race={nextRace} />
      <Countdown raceDate={nextRace.date} />
      <Podium />
    </div>
  );
}

export default App;
