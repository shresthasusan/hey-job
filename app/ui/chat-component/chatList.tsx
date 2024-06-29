import React from "react";
import { users } from "../../lib/data.js"; // Adjust the path as necessary

const ChatList = () => {
  return (
    <div className="  h-full relative  overflow-hidden rounded-2xl  shadow-[0_10px_20px_rgba(228,228,228,_0.7)]  border-r-2 ">
      {/* <!-- search compt --> */}

      <div className="border-b-2  py-4 px-2">
        <input
          type="text"
          placeholder="search "
          className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
        />
      </div>
      {/* <!-- end search compt --> */}

      {/* <!-- user list --> */}
      <div className=" h-full  overflow-scroll">
        <div className=" flex flex-col">
          {users.map((user, index) => (
            <div
              key={user.id}
              className="flex flex-row py-2 px-2 justify-center hover:bg-gray-200 items-center border-b-2"
            >
              {" "}
              {/* Moved key prop here */}
              <div className="w-1/4">
                <img
                  src={user.image}
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-[80%] relative">
                <div className="text-lg font-semibold">{user.name}</div>
                <div className="text-sm w-[80%] overflow-hidden text-gray-500">
                  {user.message}
                </div>
                <span className="absolute text-[.7rem] right-0 bottom-0 text-gray-500">
                  {user.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <!-- end user list --> */}
    </div>
  );
};

export default ChatList;
