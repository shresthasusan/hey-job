import React from 'react';

const DisplayProfile: React.FC = () => {
  return <div>Profile Details</div>;
};

const UserProfile: React.FC = () => {
  return (
    <div className='container border p-8 text-center'>
      <h1>User Profile</h1>
      <p>Welcome to the user profile page!</p>
      <DisplayProfile />
    </div>
  );
};

export default UserProfile;