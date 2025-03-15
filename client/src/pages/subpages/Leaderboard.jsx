import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data from the backend
    fetch('http://localhost:8080/leaderboard')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched leaderboard data:', data); // Add this log to inspect the fetched data
        setLeaderboard(data);
      })
      .catch((error) => {
        console.error('Error fetching leaderboard data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.length > 0 ? (
            leaderboard.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.points}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Loading leaderboard...</td>
            </tr>
          )}
        </tbody>
      </table>
      <Link to={'/dashboard'}>
        <button>Home</button>
      </Link>
    </div>
  );
}
