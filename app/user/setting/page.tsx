<<<<<<< HEAD
import SettingsPage from '@/app/ui/user-component/usersettings'
import React, { Suspense } from 'react'
=======
import SettingsPage from "@/app/ui/user-component/usersettings";
import React, { Suspense } from "react";
>>>>>>> d4bf7741fdfc5cb468979a95ee8f5cc821a0c428

const page = () => {
  return (
    <div>
<<<<<<< HEAD
      <h1 className='text-4xl text-center mt-8 font-semibold'>Settings</h1>
    <Suspense>
    <SettingsPage />
    </Suspense>
      
=======
      <h1 className="text-4xl text-center mt-8 font-semibold">Settings</h1>
      <Suspense fallback={<div>loading</div>}>
        <SettingsPage />
      </Suspense>
>>>>>>> d4bf7741fdfc5cb468979a95ee8f5cc821a0c428
    </div>
  );
};

export default page;
