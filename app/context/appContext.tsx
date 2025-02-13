"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
import { db, auth } from "../lib/firebase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { Job } from "../ui/dashboard-components/job-list/jobList";

// Define the types for the context value
interface UserData {
  id: string;
  name?: string;
  avatar?: string;
  [key: string]: any; // Additional properties for user data
}

const defaultChatUser: UserData = {
  id: "0",
  key: 0,
};

interface ChatItem {
  rId: string;
  updatedAt: number;
  userData: UserData;
  [key: string]: any; // Additional properties for chat items
}

interface AppContextValue {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  chatData: ChatItem[] | null;
  setChatData: React.Dispatch<React.SetStateAction<ChatItem[] | null>>;
  loadUserData: (uid: string) => Promise<void>;
  messages: any; // Replace `any` with a specific type if possible
  setMessages: React.Dispatch<React.SetStateAction<any>>;
  messagesId: string | null;
  setMessagesId: React.Dispatch<React.SetStateAction<string | null>>;
  chatUser: UserData;
  setChatUser: React.Dispatch<React.SetStateAction<UserData>>;
  chatVisual: boolean;
  setChatVisual: React.Dispatch<React.SetStateAction<boolean>>;
  jobData: Job | null;
  setJobData: React.Dispatch<React.SetStateAction<Job | null>>;
  jobDetailsVisible: boolean;
  setJobDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  talentData: any;
  setTalentData: React.Dispatch<React.SetStateAction<any>>;
  talentDetailsVisible: boolean;
  setTalentDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValue: AppContextValue = {
  userData: null,
  setUserData: () => {},
  chatData: null,
  setChatData: () => {},
  loadUserData: async () => {},
  messages: null,
  setMessages: () => {},
  messagesId: null,
  setMessagesId: () => {},
  chatUser: defaultChatUser,
  setChatUser: () => {},
  chatVisual: false,
  setChatVisual: () => {},
  jobData: null,
  setJobData: () => {},
  jobDetailsVisible: false,
  setJobDetailsVisible: () => {},
  talentData: null,
  setTalentData: () => {},
  talentDetailsVisible: false,
  setTalentDetailsVisible: () => {},
};

// Create the context
export const Appcontext = createContext<AppContextValue>(defaultValue);

interface Props {
  children: ReactNode;
}

const Appcontextprovider: React.FC<Props> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [chatData, setChatData] = useState<ChatItem[] | null>(null);
  const [messagesId, setMessagesId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any>(null); // Replace `any` with the appropriate type
  const [chatUser, setChatUser] = useState<UserData>(defaultChatUser);
  const [chatVisual, setChatVisual] = useState<boolean>(false);
  const [jobData, setJobData] = useState<Job | null>(null);
  const [jobDetailsVisible, setJobDetailsVisible] = useState(false);
  const [talentData, setTalentData] = useState<any>(null); // Replace `any` with the appropriate type
  const [talentDetailsVisible, setTalentDetailsVisible] = useState(false);

  const loadUserData = async (uid: string): Promise<void> => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data() as UserData;

      setUserData(userData);

      await updateDoc(userRef, {
        lastSeen: Date.now(),
      });

      const intervalId = setInterval(async () => {
        if (auth.currentUser) {
          await updateDoc(userRef, {
            lastSeen: Date.now(),
          });
        }
      }, 6000);
      console.log("loadUserData function callled");
      // Clear the interval when the component unmounts
      clearInterval(intervalId);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  useEffect(() => {
    if (userData) {
      const chatRef = doc(db, "chats", userData.id);
      const unSub = onSnapshot(chatRef, async (res) => {
        const chatItems = res.data()?.chatsData || [];
        const tempData: ChatItem[] = [];

        for (const item of chatItems) {
          const userRef = doc(db, "users", item.rId);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.data() as UserData;
          tempData.push({ ...item, userData });
        }

        setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
      });

      return () => unSub(); // Cleanup the snapshot listener
    }
  }, [userData]);

  const value: AppContextValue = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
    messages,
    setMessages,
    messagesId,
    setMessagesId,
    chatUser,
    setChatUser,
    chatVisual,
    setChatVisual,
    jobData,
    setJobData,
    jobDetailsVisible,
    setJobDetailsVisible,
    talentData,
    setTalentData,
    talentDetailsVisible,
    setTalentDetailsVisible,
  };

  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
};

export default Appcontextprovider;
