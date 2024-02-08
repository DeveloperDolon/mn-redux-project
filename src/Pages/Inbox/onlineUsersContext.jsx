import React, { createContext, useContext, useState } from 'react';

const OnlineUsersContext = createContext();

export const OnlineUsersProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  const updateOnlineStatus = (data) => {
    setOnlineUsers((prevUsers) => {
      const existingUserIndex = prevUsers.findIndex(
        (user) => user.id === data.userId
      );

      if (existingUserIndex !== -1) {
        // Update existing user status
        const updatedUsers = [...prevUsers];
        updatedUsers[existingUserIndex] = {
          ...updatedUsers[existingUserIndex],
          status: data.status,
        };
        return updatedUsers;
      } else {
        // Add a new user to the state
        return [...prevUsers, { id: data.userId, status: data.status }];
      }
    });
  };

  return (
    <OnlineUsersContext.Provider value={{ onlineUsers, updateOnlineStatus }}>
      {children}
    </OnlineUsersContext.Provider>
  );
};

export const useOnlineUsers = () => {
  return useContext(OnlineUsersContext);
};
