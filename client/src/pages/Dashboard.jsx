import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './Dashboard.module.css';
import { useUser } from '../contexts/UserContext';
import recyclingData from '../data/recyclingdata';
import recycleIcon from '../images/recycle.png';
import notepad from '../images/notepad.png';
import podium from '../images/podium.png';

export default function Dashboard() {
  const { user } = useUser();
  const [selectedRange, setSelectedRange] = useState('day');

  function getGreeting() {
    const currentHour = new Date().getHours(); // Get the current hour (0-23)

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
          <h3>🚰{recyclingData[selectedRange].bottlesSaved}</h3>
          <p>bottles saved</p>
        </div>
        <div className={styles.metrics}>
          <h3>🌍{recyclingData[selectedRange].carbonReduced}kg</h3>
          <p>CO2 emissions reduced</p>
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
        <Link to={'/resources'}>
          <button>Resources</button>
        </Link>
      </div>
    </main>
  );
}

{
  /* <div className="green-tree">
        <img src={tree1} />
      </div> */
}

// https://clevercarbon.io/carbon-footprint-of-common-items
