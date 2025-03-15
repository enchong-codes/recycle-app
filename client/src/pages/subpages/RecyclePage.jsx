import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../../contexts/UserContext'; // Import the useUser hook

export default function RecyclePage() {
  const { user, setUser } = useUser(); // Access user data and setUser from context
  const [selectedItem, setSelectedItem] = useState('');
  const [userPoints, setUserPoints] = useState(user ? user.points : 0); // Initialize with user's points
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const userId = user ? user.user_id : 'test_user'; // Use userId from the user object

  const handleSubmit = async (e) => {
    e.preventDefault();
    const item = e.target.item.value; // Get selected item

    const data = {
      item: item,
      oldPoints: userPoints, // Send current user points
      userId: userId, // Send user ID
    };

    try {
      const response = await fetch('http://127.0.0.1:8080/submit-recycle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Server Response:', responseData);

        // Update local state and context
        setUserPoints(responseData.newPoints);
        setUser({ ...user, points: responseData.newPoints });

        // Set the success message with the updated points
        setSuccessMessage(`Success! Current points: ${responseData.newPoints}`);
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
      <Link to={'/dashboard'}>
        <button>Home</button>
      </Link>
      <form onSubmit={handleSubmit}>
        <label htmlFor="item">Choose a recyclable item:</label>
        <select id="item" value={selectedItem} onChange={handleItemChange}>
          <option value="">-- Select recycled item --</option>
          <option value="591mL Plastic Bottle">591mL Plastic Bottle</option>
          <option value="2L Plastic Bottle">2L Plastic Bottle</option>
          <option value="4L Plastic Jug">4L Plastic Jug</option>
          <option value="Detergent Bottle">Detergent Bottle</option>
          <option value="Shampoo/Conditioner Bottle">
            Shampoo/Conditioner Bottle
          </option>
        </select>
        <button type="submit">Submit</button>
      </form>

      {successMessage && (
        <div style={{ color: 'green', marginTop: '10px' }}>
          {successMessage}
        </div>
      )}
    </section>
  );
}
