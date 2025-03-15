import { useState, useEffect } from 'react';
import { RouterProvider, Link, createBrowserRouter } from 'react-router-dom';
import axios from 'axios';
import './App.css';

export default function App() {
  return (
    <main>
      <h1>recycle!</h1>
      <Link to={'/login'}>
        <button>log in</button>
      </Link>
      <Link to={'/register'}>
        <button>register</button>
      </Link>
    </main>
  );
}

// const [count, setCount] = useState(0);
// const [array, setArray] = useState([]);

// const fetchAPI = async () => {
//   const response = await axios.get('http://localhost:8080/api/users');
//   console.log(response.data.users);
//   setArray(response.data.users);
// };

// useEffect(() => {
//   fetchAPI();
// }, []);
