"use client";

import { Suspense } from "react";
import ChatList from "./chatList";
import Image from "next/image";

const ChatWindow: React.FC = () => {
  return (
    <>
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
          <div className="w-full rounded-3xl shadow-[0_10px_20px_rgba(228,228,228,_0.7)] px-5 flex flex-col justify-between">
            {/* Messages section */}
            <div className="flex flex-col mt-5">
              {/* Example of a sent message */}
              <div className="flex justify-end mb-4">
                <div className="mr-2 py-3 px-4 bg-primary-500 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                  Welcome to group everyone!
                </div>
                <Image
                  src="/"
                  className="object-cover h-8 w-8 rounded-full"
                  alt="User avatar"
                  width={32}
                  height={32}
                />
              </div>

              {/* Example of a received message */}
              <div className="flex justify-start mb-4">
                <Image
                  src="/"
                  className="object-cover h-8 w-8 rounded-full"
                  alt="User avatar"
                  width={32}
                  height={32}
                />
                <div className="ml-2 py-3 px-4 bg-gray-300 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat at praesentium, aut ullam delectus odio error sit rem.
                </div>
              </div>

              {/* Example of consecutive messages from the same user */}
              <div className="flex justify-end mb-4">
                <div>
                  <div className="mr-2 py-3 px-4 bg-primary-500 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                    Lorem ipsum dolor sit amet.
                  </div>
                  <div className="mt-4 mr-2 py-3 px-4 bg-primary-500 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                    Lorem ipsum dolor sit amet consectetur.
                  </div>
                </div>
                <Image
                  src="/"
                  className="object-cover h-8 w-8 rounded-full"
                  alt="User avatar"
                  width={32}
                  height={32}
                />
              </div>

              {/* Another example of a received message */}
              <div className="flex justify-start mb-4">
                <Image
                  src="/"
                  className="object-cover h-8 w-8 rounded-full"
                  alt="User avatar"
                  width={32}
                  height={32}
                />
                <div className="ml-2 py-3 px-4 bg-gray-300 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                  Happy holiday, guys!
                </div>
              </div>
            </div>

            {/* Input field for typing new messages */}
            <div className="py-5">
              <input
                className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                type="text"
                placeholder="Type your message here..."
              />
            </div>
          </div>

          {/* Group info section */}
          <div className="w-2/5 border-l-2 px-5">
            <div className="flex flex-col">
              {/* Group title */}
              <div className="font-semibold text-xl py-4">MERN Stack Group</div>
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
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
