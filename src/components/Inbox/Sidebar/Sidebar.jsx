import React from "react";

const Sidebar = () => {
  // Dummy user data (replace with actual data from your state or API)
  const users = [
    {
      id: 1,
      name: "Admin 1",
      image: "admin1.jpg",
      lastMessage: "Hello",
      active: true,
    },
    {
      id: 2,
      name: "Admin 2",
      image: "admin2.jpg",
      lastMessage: "How are you?",
      active: false,
    },
    // Add more users as needed
  ];

  return (
    <div className="p-4">
      {/* Navigation Section */}
      <div className="mb-4">
        {/* Add your navigation components here */}
        {/* For example: */}
        <div className="font-bold text-lg mb-2">Chat</div>
        <input
          type="text"
          placeholder="Search user..."
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      {/* User List */}
      <div>
        {/* Map through the users and render each user component */}
        {users.map(user => (
          <div key={user.id} className="flex items-center mb-2">
            <img
              src={user.image}
              alt={user.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-gray-500">{user.lastMessage}</div>
            </div>
            {/* Indicator for active user */}
            {user.active && (
              <div className="w-3 h-3 bg-green-500 rounded-full ml-auto"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
