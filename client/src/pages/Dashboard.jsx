import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { useUser } from '../contexts/UserContext';
import recyclingData from '../data/recyclingdata';
import recycleIcon from '../images/recycle.png';
import notepad from '../images/notepad.png';
import podium from '../images/podium.png';

export default function Dashboard() {
  const { user } = useUser(); // Access user context directly
  const [selectedRange, setSelectedRange] = useState('day');
  const [bottlesSaved, setBottlesSaved] = useState(0);
  const [carbonReduced, setCarbonReduced] = useState(0);

  console.log(user);
  // Update the bottlesSaved and carbonReduced based on the selected range and user data
  useEffect(() => {
    if (user) {
      if (selectedRange === 'day') {
        setBottlesSaved(user.bottlesSaved || 0);

        const carbon = ((user.bottlesSaved || 0) * 83) / 1000; // CO2 in kg
        setCarbonReduced(carbon);
      }
    }
  }, [selectedRange, user]); // Ensure that both selectedRange and user are dependencies

  // Greeting based on the time of day
  function getGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }

  const userGreeting = user ? `${getGreeting()}, ${user.user}!` : 'Loading...';

  return (
    <main>
      <div className={`${styles.container} ${styles.greeting}`}>
        <h2>{userGreeting}</h2>
      </div>
      <div className={styles.timerange}>
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
          <option value="allTime">All-Time</option>
        </select>
      </div>
      <div className={styles.container}>
        <div className={styles.metrics}>
          <h3>
            🚰
            {selectedRange === 'day'
              ? bottlesSaved
              : recyclingData[selectedRange].bottlesSaved}
          </h3>
          <p>bottles saved</p>
        </div>
        <div className={styles.metrics}>
          <h3>
            🌍
            {selectedRange === 'day'
              ? carbonReduced
              : recyclingData[selectedRange].carbonReduced}
            kg
          </h3>
          <p>approx. CO2 reduced</p>
        </div>
      </div>
      <h3 className={styles.actionHeader}>Take action!</h3>
      <div className={`${styles.container} ${styles.actions}`}>
        <Link to={'/recycle'}>
          <button>
            <img className="icon" src={recycleIcon} alt="recycle icon" />
            <span>Recycle</span>
          </button>
        </Link>
        <Link to={'/quiz'}>
          <button>
            <img className="icon" src={notepad} alt="notepad icon" />
            <span>Quiz</span>
          </button>
        </Link>
        <Link to={'/leaderboard'}>
          <button>
            <img className="icon" src={podium} alt="podium icon" />
            <span>Leaderboard</span>
          </button>
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.points}>
          <h1>{user ? `${user.points} Points` : 'Loading points...'}</h1>
          <Link to={'/rewards'}>
            <button className={styles.rewardsbtn}>Rewards</button>
          </Link>
        </div>
      </div>
      <div className={styles.bottomnav}>
        <Link to={'/quickfacts'}>
          <button>Quick Facts</button>
        </Link>
        <button>Resources</button>
      </div>
    </main>
  );
}
