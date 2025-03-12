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
import Link from "next/link";

interface Message {
  sId: string;
  text?: string;
  image?: string;
  createdAt: any;
  attachment?: {
    type: "proposalDetails" | "contractOffer" | "activeContract";
    data: any;
  };
}

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      sendMessage();
    }
  };

  const ProposalDetailsComponent = ({
    data,
    msg,
  }: {
    data: any;
    msg: Message;
  }) => (
    <div className="mt-3 rounded-lg border border-yellow-300 overflow-hidden shadow-sm">
      <div className="bg-yellow-100 p-4 border-b border-yellow-300">
        <h3 className="text-lg font-bold text-yellow-800">
          {data.jobId.title}
        </h3>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="px-2 py-1 bg-yellow-200 rounded-full text-sm font-medium text-yellow-800">
            Budget: {data.jobId.budget}
          </span>
          <span className="px-2 py-1 bg-yellow-200 rounded-full text-sm font-medium text-yellow-800">
            Experience: {data.jobId.experience}
          </span>
        </div>
      </div>
      <div className="p-4 bg-white border-b border-yellow-200">
        <p className="text-sm text-gray-700 line-clamp-3">
          {data.jobId.description}
        </p>
        <button className="mt-1 text-xs text-blue-600 hover:text-blue-800 font-medium">
          Read more
        </button>
      </div>
      <div className="p-4 bg-gray-50">
        <h4 className="font-semibold text-gray-700">Proposal Details</h4>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 text-sm">Your Bid:</span>
          <span className="font-bold text-green-600">${data.bidAmount}</span>
        </div>
        <div className="mt-2">
          <p className="text-xs text-gray-500 font-medium mb-1">
            Cover Letter:
          </p>
          <p className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200 max-h-20 overflow-y-auto">
            {data.coverLetter}
          </p>
        </div>
        <div className="mt-2">
          <Link
            className="text-xs text-primary-500 underline font-medium mx-auto mb-1"
            href={
              userData?.id === msg.sId
                ? `/client/job-proposal/${data.jobId._id}`
                : `/user/your-proposals`
            }
          >
            View proposal
          </Link>
        </div>
      </div>
    </div>
  );

  const ContractOfferComponent = ({
    data,
    msg,
  }: {
    data: any;
    msg: Message;
  }) => (
    <div className="p-4 border rounded-lg shadow-sm bg-blue-100">
      <h3 className="text-lg font-bold text-blue-800">Contract Offer</h3>
      <p className="text-sm text-gray-700">{data.contractTerms}</p>
      <div className="mt-2 flex justify-end">
        <button className="text-white bg-green-500 px-3 py-1 rounded-md">
          Accept
        </button>
        <button className="ml-2 text-white bg-red-500 px-3 py-1 rounded-md">
          Decline
        </button>
      </div>
    </div>
  );

  const ActiveContractComponent = ({
    data,
    msg,
  }: {
    data: any;
    msg: Message;
  }) => (
    <div className="p-4 border rounded-lg shadow-sm bg-green-100">
      <h3 className="text-lg font-bold text-green-800">Active Contract</h3>
      <p className="text-sm text-gray-700">Project: {data.projectTitle}</p>
      <p className="text-sm text-gray-700">Status: {data.status}</p>
    </div>
  );

  return (
    <>
      <UserProfileLoader />
      <div className="w-full p-5">
        <div className="flex flex-row gap-5 justify-between bg-white">
          <div className="w-1/3 h-[calc(100vh-120px)] relative rounded-3xl shadow-[0_10px_20px_rgba(228,228,228,_0.7)] overflow-hidden">
            <Suspense>
              <ChatList />
            </Suspense>
          </div>

          {chatUser.id !== "0" ? (
            <>
              <div className=" w-full rounded-3xl overflow-scroll h-[calc(100vh-120px)] shadow-[0_10px_20px_rgba(228,228,228,_0.7)] flex flex-col justify-between">
                <div className="flex break-words flex-col-reverse mt-5">
                  {messages?.map((msg: Message, index: number) => (
                    <div
                      key={index}
                      className={`flex mb-4 items-center ${
                        msg.attachment
                          ? "justify-center"
                          : msg.sId === userData?.id
                            ? "justify-end"
                            : "justify-end flex-row-reverse"
                      } `}
                    >
                      <div
                        className={`py-3 px-4 max-w-md rounded-tl-3xl rounded-tr-xl text-white${
                          msg.attachment
                            ? ""
                            : msg.sId === userData?.id
                              ? "bg-primary-500 mr-2 rounded-bl-3xl"
                              : "bg-gray-300 ml-2 rounded-br-3xl"
                        }`}
                      >
                        {msg.image ? (
                          <Image
                            width={200}
                            height={200}
                            src={msg.image}
                            alt={"msg-image"}
                          />
                        ) : msg.attachment ? (
                          msg.attachment.type === "proposalDetails" ? (
                            <ProposalDetailsComponent
                              data={msg.attachment.data}
                              msg={msg}
                            />
                          ) : msg.attachment.type === "contractOffer" ? (
                            <ContractOfferComponent
                              data={msg.attachment.data}
                              msg={msg}
                            />
                          ) : msg.attachment.type === "activeContract" ? (
                            <ActiveContractComponent
                              data={msg.attachment.data}
                              msg={msg}
                            />
                          ) : null
                        ) : (
                          <p className="msg break-words">{msg.text}</p>
                        )}
                      </div>
                      <Image
                        src={
                          msg.sId === userData?.id
                            ? userData.avatar || "/default-avatar.png"
                            : chatUser.avatar || "/default-avatar.png"
                        }
                        className={`${msg.attachment ? "hidden" : ""} object-cover h-8 w-8 rounded-full`}
                        alt="User avatar"
                        width={32}
                        height={32}
                      />
                      <p
                        className={`text-sm mx-2 ${msg.attachment ? "hidden" : ""}`}
                      >
                        {convertTimestamp(msg.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="py-5  flex items-center bottom-0 sticky bg-white w-full px-5">
                  <input
                    className="w-full bg-gray-200 py-5 px-3 rounded-xl"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    onKeyDown={handleKeyDown}
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
                </div>
              </div>

              <div className="w-2/5 border-l-2 px-5">
                <div className="flex flex-col">
                  <div className="font-semibold text-xl py-4 ">
                    {chatUser.username}
                  </div>
                  <Image
                    src={chatUser.avatar || "/default-avatar.png"}
                    className="object-cover rounded-full"
                    alt="Group image"
                    width={200}
                    height={200}
                  />
                  <div className="font-semibold py-4  text-neutral-400">
                    Last seen {convertTimestamp(chatUser.lastSeen)}
                  </div>
                  <div className="font-light"></div>
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
