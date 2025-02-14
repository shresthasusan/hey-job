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
import { PaperAirplaneIcon, PhotoIcon } from "@heroicons/react/24/outline";
import UserProfileLoader from "@/app/lib/userProfileLoader";

const ChatWindow: React.FC = () => {
  const { userData, messagesId, chatUser, messages, setMessages, chatVisual } =
    useContext(Appcontext);

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

        const userIDs = [chatUser.id, userData.id];

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

        const userIDs = [chatUser.id, userData.id];

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
    let date;
    if (!timestamp) {
      console.log(timestamp);
      return;
    }
    if (timestamp instanceof Date) {
      date = timestamp;
    } else if (typeof timestamp === "number") {
      date = new Date(timestamp);
    } else if (timestamp && typeof timestamp.toDate === "function") {
      date = timestamp.toDate();
    } else {
      console.log(timestamp);
      throw new Error("Invalid timestamp", timestamp);
    }

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
  }, [messagesId, chatUser, setMessages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      sendMessage();
    }
  };

  return (
    <>
      <UserProfileLoader />
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
          {chatUser.id !== "0" ? (
            <>
              <div className="w-full rounded-3xl overflow-scroll relative h-[calc(100vh-120px)] shadow-[0_10px_20px_rgba(228,228,228,_0.7)] px-5 flex flex-col justify-between">
                {/* Messages section */}
                <div className="flex  flex-col-reverse mt-5">
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
                      <div
                        key={index}
                        className={`flex  mb-4 items-center ${
                          msg.sId === userData?.id
                            ? `justify-end `
                            : `justify-end flex-row-reverse`
                        } `}
                      >
                        <div
                          className={`py-3 px-4 rounded-tl-3xl rounded-tr-xl  text-white  ${
                            msg.sId === userData?.id
                              ? `bg-primary-500 mr-2 rounded-bl-3xl`
                              : `bg-gray-300 ml-2 rounded-br-3xl`
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
                        <Image
                          src={
                            msg.sId === userData?.id
                              ? userData.avatar || "/default-avatar.png"
                              : chatUser.avatar || "/default-avatar.png"
                          }
                          className="object-cover h-8 w-8 rounded-full"
                          alt="User avatar"
                          width={32}
                          height={32}
                        />
                        <p className="text-sm mx-2">
                          {convertTimestamp(msg.createdAt)}
                        </p>
                      </div>
                    )
                  )}
                </div>

                {/* Input field for typing new messages */}
                <div className="py-5  flex items-center bottom-0 sticky bg-white w-full">
                  <textarea
                    className="w-full bg-gray-200 py-5 px-3 rounded-xl h-32  overflow-y-auto"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    placeholder="Type your message here..."
                    onKeyDown={handleKeyDown}
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
                </div>
              </div>

              {/* Group info section */}
              <div className="w-2/5 border-l-2 px-5">
                <div className="flex flex-col">
                  {/* Group title */}
                  <div className="font-semibold text-xl py-4 ">
                    {chatUser.username}
                  </div>
                  <span className="w-48 h-48 overflow-hidden rounded-full">
                    <Image
                      src={chatUser.avatar || "/default-avatar.png"}
                      className="object-cover rounded-full"
                      alt="Group image"
                      width={200}
                      height={200}
                    />
                  </span>
                  <div className="font-semibold py-4  text-neutral-400">
                    Last seen {convertTimestamp(chatUser.lastSeen)}
                  </div>
                  <div className="font-light">
                    {/* Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deserunt, perspiciatis! */}
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
