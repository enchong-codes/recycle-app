import { createContext, useContext, useState, useEffect } from 'react';

// Create the UserContext
const UserContext = createContext();

// Custom hook to access user data and setUser function
export function useUser() {
  return useContext(UserContext);
}

// UserProvider component to wrap around your app and provide context
export function UserProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  ); // Persist user in localStorage

  // Sync the user data with localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
