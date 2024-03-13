import React, { useState, useEffect } from 'react';

function Podium() {
  const [podiumResults, setPodiumResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodiumResults = async () => {
      try {
        const response = await fetch('http://ergast.com/api/f1/current/last/results.json');
        if (!response.ok) {
          throw new Error('Failed to fetch podium results');
        }
        const data = await response.json();
        const results = data.MRData.RaceTable.Races[0].Results.slice(0, 3); // Get Top 3 Results from the Podium

        setPodiumResults(results.map(result => ({
          position: result.position,
          driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
          constructor: result.Constructor.name,
          time: result.Time ? result.Time.time : 'N/A', // If time is not available for podium finishers
        })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPodiumResults();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="Podium">
      <h2 className="section-heading">Last Race Podium</h2>
      <ul>
        {podiumResults.map((result, index) => (
          <li key={index}>
            <strong>Driver:</strong> {result.driver}<br />
            <strong>Team:</strong> {result.constructor}<br />
            <strong>Time:</strong> {result.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Podium;
