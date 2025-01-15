"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { Appcontext } from "@/app/context/appContext";

const ChatList: React.FC = () => {
  //hereeee
  type UserData = {
    id: string;
    avatar: string;
    name: string;
    username: string;
  };

  type ChatDataItem = {
    messageId: string;
    lastMessage: string;
    rId: string;
    updateDoc: number;
    messageSeen: boolean;
    userData: UserData;
  };

  interface AppContextValue {
    userData: UserData | null;
    setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
    chatData: ChatDataItem[] | null;
    setChatData: React.Dispatch<React.SetStateAction<ChatDataItem[] | null>>;
    loadUserData: (uid: string) => Promise<void>;
    messages: any; // Replace `any` with a specific type if possible
    setMessages: React.Dispatch<React.SetStateAction<any>>;
    messagesId: string | null;
    setMessagesId: React.Dispatch<React.SetStateAction<string | null>>;
    chatUser: UserData | null;
    setChatUser: React.Dispatch<React.SetStateAction<UserData | null>>;
    chatVisual: boolean;
    setChatVisual: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const context = useContext(Appcontext) as AppContextValue;
  const {
    userData,
    chatData,
    chatUser,
    setChatUser,
    setMessagesId,
    messagesId,
    chatVisual,
    setChatVisual,
  } = context;

  const [user, setUser] = useState<UserData | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  const inputHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const input = e.target.value?.trim().toLowerCase(); // Ensure input is a trimmed lowercase string
      if (input) {
        setShowSearch(true);

        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", input));
        const querySnap = await getDocs(q);

        if (!querySnap.empty && querySnap.docs[0].data().id !== userData?.id) {
          let userExist = false;
          chatData?.forEach((user: ChatDataItem) => {
            if (user.rId === querySnap.docs[0].data().id) {
              userExist = true;
            }
          });

          if (!userExist) {
            setUser(querySnap.docs[0].data() as UserData);
          }
        } else {
          setUser(null);
        }
      } else {
        setShowSearch(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addChat = async () => {
    if (!user) return;

    const messagesRef = collection(db, "messages");
    const chatsRef = collection(db, "chats");
    try {
      const newMessageRef = doc(messagesRef);
      await setDoc(newMessageRef, {
        createAt: serverTimestamp(),
        messages: [],
      });

      const chatData = {
        messageId: newMessageRef.id,
        lastMessage: "",
        rId: userData?.id,
        updateDoc: Date.now(),
        messageSeen: true,
      };

      await updateDoc(doc(chatsRef, user.id), {
        chatsData: arrayUnion(chatData),
      });
      await updateDoc(doc(chatsRef, userData?.id), {
        chatsData: arrayUnion({ ...chatData, rId: user.id }),
      });
    } catch (error: any) {
      console.error(error);
      console.error(error);
    }
  };

  const setChat = async (item: ChatDataItem) => {
    try {
      setMessagesId(item.messageId);
      setChatUser(item.userData);

      if (!userData?.id) {
        throw new Error("User ID is undefined");
      }
      const userChatsRef = doc(db, "chats", userData.id);
      const userChatsSnapshot = await getDoc(userChatsRef);
      const userChatsData = userChatsSnapshot.data();

      if (userChatsData) {
        const chatsData = userChatsData.chatsData as ChatDataItem[];
        const chatIndex = chatsData.findIndex(
          (c) => c.messageId === item.messageId
        );

        if (chatIndex > -1) {
          chatsData[chatIndex].messageSeen = true;
          await updateDoc(userChatsRef, { chatsData });
        }
      }

      setChatVisual(true);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="h-full relative overflow-hidden rounded-2xl shadow-[0_10px_20px_rgba(228,228,228,_0.7)] border-r-2">
      {/* Search component */}
      <div className="border-b-2 py-4 px-2">
        <input
          onChange={inputHandler}
          type="text"
          placeholder="search here.."
          className="py-2 px-2 border-2 border-gray-200 hover:border-primary-400 rounded-2xl w-full"
        />
        {/* <MagnifyingGlassCircleIcon /> */}
      </div>

      {/* User list */}
      <div className="h-full pb-16 overflow-scroll">
        <div className="flex flex-col">
          {showSearch && user ? (
            <div
              onClick={addChat}
              className="flex flex-row py-2 px-2 justify-center hover:bg-gray-200 items-center border-b-2"
            >
              <div className="w-1/4">
                <Image
                  src={user.avatar}
                  className="object-cover h-12 w-12 rounded-full"
                  alt={user.username}
                  width={48}
                  height={48}
                />
              </div>
            </div>
          ) : (
            // <div className="text-center text-gray-500 mt-4">
            //   No chats available
            // </div>
            chatData?.map((user: ChatDataItem, index: number) => (
              <div
                key={index}
                className="flex flex-row py-2 px-2 justify-center hover:bg-gray-200 items-center border-b-2"
                onClick={() => setChat(user)}
              >
                {/* User avatar */}
                <div className="w-1/4">
                  <Image
                    src={user.userData.avatar}
                    className="object-cover h-12 w-12 rounded-full"
                    alt={user.userData.username}
                    width={48}
                    height={48}
                  />
                </div>
                {/* User details */}
                <div className="w-[80%] relative">
                  <div className="text-lg font-medium">
                    {user.userData.username}
                  </div>
                  <div className="text-sm w-[80%] overflow-hidden text-gray-500">
                    {user.lastMessage}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
