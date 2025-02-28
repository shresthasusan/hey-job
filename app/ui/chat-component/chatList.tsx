"use client";

import { useContext, useEffect, useState } from "react";
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
  type ChatDataItem = {
    messageId: string;
    lastMessage: string;
    rId: string;
    updateDoc: number;
    messageSeen: boolean;
    userData: UserData;
    user: UserData;
    lastMessageSender?: string;
  };

  interface UserData {
    id: string;
    name?: string;
    avatar?: string;
    [key: string]: any; // Additional properties for user data
  }

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
    setChatVisual,
  } = context;

  const [user, setUser] = useState<UserData | null>(null);

  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<UserData[]>([]);

  const inputHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const input = e.target.value?.trim().toLowerCase(); // Ensure input is trimmed & lowercase
      if (!input) {
        setShowSearch(false);
        setSearchResults([]); // Clear search results when input is empty
        return;
      }

      setShowSearch(true);

      const userRef = collection(db, "users");
      const q = query(
        userRef,
        where("username", ">=", input),
        where("username", "<=", input + "\uf8ff")
      );
      const querySnap = await getDocs(q);

      if (!querySnap.empty) {
        const users: UserData[] = querySnap.docs
          .map((doc) => doc.data() as UserData)
          .filter((user) => user.id !== userData?.id); // Exclude current user

        setSearchResults(users);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const addChat = async (selectedUser: UserData) => {
    try {
      const messagesRef = collection(db, "messages");
      const chatsRef = collection(db, "chats");

      const conversationExists = chatData?.some(
        (chat) => chat.rId === selectedUser.id
      );
      if (conversationExists) {
        setChatUser(selectedUser);
        alert("heyyy");
        return;
      }

      const newMessageRef = doc(messagesRef);
      await setDoc(newMessageRef, {
        createAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(chatsRef, selectedUser.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "You can now start your conversation",
          rId: userData?.id,
          updateDoc: Date.now(),
          messageSeen: true,
        }),
      });

      await updateDoc(doc(chatsRef, userData?.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "You can now start your conversation",
          rId: selectedUser.id,
          updateDoc: Date.now(),
          messageSeen: true,
        }),
      });

      setChatUser(selectedUser);
      setMessagesId(newMessageRef.id);
    } catch (error) {
      console.error("Error adding chat:", error);
    }
  };

  const setChat = async (item: ChatDataItem) => {
    try {
      setMessagesId(item.messageId);
      setChatUser(item.userData);
      console.log("setChatUser", chatUser);
      // console.log("setUser", item);
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
          {showSearch && searchResults.length > 0
            ? searchResults.map((user, index) => (
                <div
                  key={index}
                  onClick={() => addChat(user)}
                  className="flex flex-row py-2 px-2 justify-center hover:bg-gray-200 items-center border-b-2"
                >
                  <div className="w-1/4">
                    <Image
                      src={user.avatar || "/images/image1.png"}
                      className="object-cover h-12 w-12 rounded-full"
                      alt={user.username}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="w-[80%] relative">
                    <div className="text-lg font-medium">{user.username}</div>
                  </div>
                </div>
              ))
            : chatData?.map((item: ChatDataItem, index: number) => (
                <div
                  key={index}
                  className="flex flex-row py-2 px-2 justify-center hover:bg-gray-200 items-center border-b-2"
                  onClick={() => setChat(item)}
                >
                  <div className="w-1/4">
                    <Image
                      src={item.userData.avatar || "/images/image1.png"}
                      className="object-cover h-12 w-12 rounded-full"
                      alt={item.userData.username}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="w-[80%] relative">
                    <div className="text-lg font-medium">
                      {item.userData.username}
                      {!item.messageSeen && (
                        <span className="absolute top-0 right-0 h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 "></span>
                        </span>
                      )}
                    </div>
                    <div
                      className={`text-sm w-[80%] overflow-hidden text-gray-500 ${!item.messageSeen ? "font-bold" : ""}`}
                    >
                      {item.rId === item.lastMessageSender ? "" : "You: "}
                      {item.lastMessage}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
