import React, { useState, useEffect } from 'react';

const AdminProfile = () => {
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await fetch('/api/admin/profile');
        if (response.ok) {
          const data = await response.json();
          setAdminInfo(data);
        } else {
          throw new Error('Failed to fetch admin profile');
        }
      } catch (error) {
        console.error('Error fetching admin profile:', error);
      }
    };

    fetchAdminInfo();
  }, []);

  return (
    <div>
      <h1>Admin Profile</h1>
      {adminInfo ? (
        <div>
          <p>Name: {adminInfo.name}</p>
          <p>Email: {adminInfo.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminProfile;