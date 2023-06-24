import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css'; // Import the CSS file

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users?page=2');
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input" // Add class name for the input element
      />
      <div className="user-list">
      {filteredUsers.length===0?<div className="image-container">
             <p>No result found</p>
            </div>:
        filteredUsers.map(user => (
          <div key={user.id} className="user-card">
            <div className="id">{user.id}</div>
            <div className="image-container">
              <img src={user.avatar} alt="Avatar" className="image" />
            </div>
            <div className="name">{user.first_name} {user.last_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
