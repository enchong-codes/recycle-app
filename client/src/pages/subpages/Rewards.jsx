import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../../contexts/UserContext'; // Import the useUser hook

export default function Rewards() {
  const { user, setUser } = useUser(); // Access user data and setUser from context
  const [selectedItem, setSelectedItem] = useState('');
  const [userPoints, setUserPoints] = useState(user ? user.points : 0); // Initialize with user's points
  const userId = user ? user.user_id : 'test_user'; // Use userId from the user object

  const handleSubmit = async (e) => {
    e.preventDefault();

    const item = e.target.item.value; // Get the selected item

    // Prepare the data to send in the request body
    const data = {
      item: item,
      oldPoints: userPoints, // Send the current points of the user
      userId: userId, // Send the userId
    };

    try {
      const response = await fetch('http://127.0.0.1:8080/submit-recycle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Server Response:', responseData);

        // Update the user points based on the server response
        setUserPoints(responseData.newPoints);
        setUser({ ...user, points: responseData.newPoints }); // Update points in global context
        alert(`New Points: ${responseData.newPoints}`);
      } else {
        console.error('Error submitting data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle change in the selected recyclable item
  const handleItemChange = (e) => {
    setSelectedItem(e.target.value); // Update the selected item when changed
  };

  return (
    <section>
      <h1>Rewards</h1>
      <Link to={'/dashboard'}>
        <button>Home</button>
      </Link>
      <form onSubmit={handleSubmit}></form>
    </section>
  );
}
