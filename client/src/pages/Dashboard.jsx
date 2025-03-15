import { useLocation } from 'react-router-dom';

export default function Dashboard() {
  const { user, userId } = useLocation().state || {};
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
  console.log(user);
  const userGreeting = user ? `${getGreeting()}, ${user.user}!` : 'Loading...';

  return (
    <main>
      <h2>{userGreeting}</h2>
    </main>
  );
}
