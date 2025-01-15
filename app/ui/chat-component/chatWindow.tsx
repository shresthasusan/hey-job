"use client";

import { Suspense, useContext, useEffect, useState } from "react";
import ChatList from "./chatList";
import Image from "next/image";
import { Appcontext } from "@/app/context/appContext";
import { db, upload } from "@/app/lib/firebase";
import {
  updateDoc,
  doc,
  arrayUnion,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  PaperAirplaneIcon,
  PhotoIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import UserProfileLoader from "@/app/lib/userProfileLoader";

const ChatWindow: React.FC = () => {
  const { userData, messagesId, chatUser, messages, chatData, setMessages, chatVisual } =
    useContext(Appcontext) ;

  // console.log('data',userData);
  
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    try {
      if (input && messagesId && userData) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date(),
          }),
        });
        if (!chatUser) return;
        const userIDs = [chatUser.rid, userData.id];

        userIDs.forEach(async (id) => {
          const userChatsRef = doc(db, "chats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findIndex(
              (c: { messageId: string }) => c.messageId === messagesId
            );
            userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }

            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData,
            });
          }
        });
      }
    } catch (error) {
      console.error((error as any).message);
    }
    setInput("");
  };

  const sendImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!userData) return;
      if (!e.target.files) return;
      const fileUrl = await upload(e.target.files[0]);
      if (fileUrl && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            image: fileUrl,
            createdAt: new Date(),
          }),
        });
        const userIDs = [chatUser?.rId, userData.id];

        userIDs.forEach(async (id) => {
          const userChatsRef = doc(db, "chats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findIndex(
              (c: { messageId: string }) => c.messageId === messagesId
            );
            userChatData.chatsData[chatIndex].lastMessage = "Image";
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }

            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData,
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const convertTimestamp = (timestamp: any) => {
    let date = timestamp.toDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    if (hour > 12) {
      return hour - 12 + ":" + minute + "PM";
    } else {
      return hour + ":" + minute + "AM";
    }
  };

  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
        const data = res.data();

        if (setMessages) {
          setMessages(data?.messages.reverse());
        }
      });
      return () => {
        unSub();
      };
    }
  }, [messagesId]);

  
    console.log("userData", userData);
    
    console.log("chatData", chatData);
    console.log("CHATuSE", chatUser);
      return (
    <><UserProfileLoader/>
      {/* Container for the entire chat window layout */}
      <div className="w-full p-5">
        <div className="flex flex-row gap-5 justify-between bg-white">
          {/* Chat list container */}
          <div className="w-1/3 h-[calc(100vh-120px)] rounded-3xl shadow-[0_10px_20px_rgba(228,228,228,_0.7)] overflow-hidden">
            {/* Suspense wrapper for lazy loading the ChatList component */}
            <Suspense>
              <ChatList />
            </Suspense>
          </div>

          {/* Chat messages container */}
          {chatUser ? (
            <>
              <div className="w-full rounded-3xl shadow-[0_10px_20px_rgba(228,228,228,_0.7)] px-5 flex flex-col justify-between">
                {/* Messages section */}
                <div className="flex flex-col flex-col-reverse mt-5">
                  {messages?.map(
                    (
                      msg: {
                        sId: string;
                        text?: string;
                        image?: string;
                        createdAt: any;
                      },
                      index: number
                    ) => (
                      <div key={index} className={`flex  mb-4  ${
                            msg.sId === userData?.id
                              ? `justify-end`
                              : `justify-start`
                          } `}>
                        <div
                          className={`py-3 px-4 rounded-tl-3xl rounded-tr-xl text-white rounded-bl-3xl ${
                            msg.sId === userData?.id
                              ? `bg-primary-500 mr-2`
                              : `bg-gray-300 ml-2`
                          }   `}
                        >
                          {msg["image"] ? (
                            <Image
                              width={200}
                              height={200}
                              src={msg.image}
                              alt={"msg-image"}
                            />
                          ) : (
                            <p className="msg">{msg.text}</p>
                          )}
                        </div>
                        {/* <Image
                          src={
                            msg.sId === userData?.id
                              ? userData.avatar
                              : chatUser?.userData.avatar 
                          }
                          className="object-cover h-8 w-8 rounded-full"
                          alt="User avatar"
                          width={32}
                          height={32}
                        /> */}
                        <p>{convertTimestamp(msg.createdAt)}</p>
                      </div>
                    )
                  )}
                </div>


                {/* Input field for typing new messages */}
                <div className="py-5 relative flex items-center">
                  <input
                    className="w-full bg-gray-200 py-5 px-3 rounded-xl"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    type="text"
                    placeholder="Type your message here..."
                  />
                  <input
                    onChange={sendImage}
                    type="file"
                    id="image"
                    accept="image/png, image/jpeg"
                    hidden
                  />
                  <label htmlFor="image">
                    <PhotoIcon className="w-8 h-8 top-0 " />
                  </label>
                  <span onClick={sendMessage}>
                    <PaperAirplaneIcon className="w-8 h-8 top-0 " />
                  </span>
                  {/* hereee */}
                </div>
              </div>


              {/* Group info section */}
              <div className="w-2/5 border-l-2 px-5">
                <div className="flex flex-col">
                  {/* Group title */}
                  <div className="font-semibold text-xl py-4">
                    MERN Stack Group
                  </div>
                  <Image
                    src="/"
                    className="object-cover rounded-xl h-64"
                    alt="Group image"
                    width={32}
                    height={32}
                  />
                  <div className="font-semibold py-4">Created 22 Sep 2021</div>
                  <div className="font-light">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deserunt, perspiciatis!
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={`chat-welcome ${chatVisual ? "" : "hidden"}`}>
              <Image
                src={"/logo/login-logo.png"}
                width={32}
                height={32}
                alt={"logo"}
              />
              <p>chat anytime, anywhere</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
