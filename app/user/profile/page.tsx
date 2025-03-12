'use client';

import React from 'react';
import DisplayProfile from '../../ui/user-component/displayProfile';



const UserProfile: React.FC = () => {
  return (
    <div  >
      <h1 className='font-black text-center text-5xl'>User Profile</h1>
      <DisplayProfile />
    </div>
  );
};

export default UserProfile;