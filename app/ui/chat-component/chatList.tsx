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
import { auth, db } from "@/app/lib/firebase";
import { Appcontext } from "@/app/context/appContext";
import { onAuthStateChanged } from "firebase/auth";
import UserProfileLoader from "@/app/lib/userProfileLoader";

const ChatList: React.FC = () => {
  //hereeee

  type ChatDataItem = {
    messageId: string;
    lastMessage: string;
    rId: string;
    updateDoc: number;
    messageSeen: boolean;
    userData: UserData;
    user: UserData;
  };

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
  <UserProfileLoader />;

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
          setUser(querySnap.docs[0].data() as UserData);
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
    console.log("user", user);
    console.log("userData", userData);

    const messagesRef = collection(db, "messages");
    const chatsRef = collection(db, "chats");

    try {
      // Check if user.id exists in chatData.rId
      const conversationExists = chatData?.some(
        (chat) => chat.rId === user?.id
      );
      if (conversationExists) {
        alert("You already have a conversation with this user.");
        if (user) {
          const chatDataItem: ChatDataItem = {
            messageId: "", // You can set this to an appropriate value if available
            lastMessage: "",
            rId: user.id,
            updateDoc: Date.now(),
            messageSeen: false,
            userData: user,
            user: user,
          };
          setChat(chatDataItem);
          console.log("send", userData);
          setChatUser(user);
        }
        return;
      }

      const newMessageRef = doc(messagesRef);
      await setDoc(newMessageRef, {
        createAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(chatsRef, user?.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: userData?.id,
          updateDoc: Date.now(),
          messageSeen: true,
        }),
      });

      await updateDoc(doc(chatsRef, userData?.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: user?.id,
          updateDoc: Date.now(),
          messageSeen: true,
        }),
      });
    } catch (error: any) {
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
          {showSearch && user ? (
            <div
              onClick={addChat}
              className="flex flex-row py-2 px-2 justify-center hover:bg-gray-200 items-center border-b-2"
            >
              <div className="w-1/4">
                <Image
                  src={user.avatar || "/default-avatar.png"}
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
          ) : (
            // <div className="text-center text-gray-500 mt-4">
            //   No chats available
            // </div>
            chatData?.map((item: ChatDataItem, index: number) => (
              <div
                key={index}
                className="flex flex-row py-2 px-2 justify-center hover:bg-gray-200 items-center border-b-2"
                onClick={() => setChat(item)}
              >
                {/* User avatar */}
                <div className="w-1/4">
                  <Image
                    src={item.userData.avatar || "/default-avatar.png"}
                    className="object-cover h-12 w-12 rounded-full"
                    alt={item.userData.username}
                    width={48}
                    height={48}
                  />
                </div>
                {/* User details */}
                <div className="w-[80%] relative">
                  <div className="text-lg font-medium">
                    {item.userData.username}
                  </div>
                  <div className="text-sm w-[80%] overflow-hidden text-gray-500">
                    {item.lastMessage}
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
