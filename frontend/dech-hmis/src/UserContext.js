// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Create UserContext
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold user data

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// Export the UserContext itself for potential usage
export { UserContext };
