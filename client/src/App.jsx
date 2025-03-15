import { RouterProvider, Link, createBrowserRouter } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <main>
      <h1 className="appName">EcoPoints</h1>
      <div className="appDiv">
        <Link to={'/login'}>
          <button className="appBtn">Log In</button>
        </Link>
        <Link to={'/register'}>
          <button className="appBtn">Register</button>
        </Link>
      </div>
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
