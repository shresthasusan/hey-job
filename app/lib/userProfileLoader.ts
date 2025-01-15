'use client';
import { useContext, useEffect } from "react";


import { useSession } from "next-auth/react"; // Assuming you're using NextAuth.js for authentication
import { Appcontext } from "../context/appContext";

const UserProfileLoader: React.FC = () => {
  const { data: session } = useSession(); // Access session
  const {loadUserData} = useContext(Appcontext);

  useEffect(() => {
    if (session?.user?.id ) {
      console.log("Calling loadUserData with session.user.id:", session.user.id);
      loadUserData(session.user.id);
    }
    
  }, [session?.user?.id]);

  return null;
};

export default UserProfileLoader;
