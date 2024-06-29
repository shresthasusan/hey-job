import Image from "next/image";
import React from "react";

const ProfileCard = () => {
  return (
    <>
      <div className="flex  min-w-[280px] flex-col relative rounded-3xl h-[250px] overflow-hidden shadow-[0_10px_20px_rgba(228,228,228,_0.7)] ">
        <div className=" h-[40%] bg-secondary-600  overflow-hidden">
          <Image
            src="/images/placeholder-614.webp"
            alt="cover"
            width={100}
            className="w-full object-cover "
            height={100}
          />
        </div>
        <div
          className="bg-yellow-400  rounded-full
              absolute translate-y-[50%] overflow-hidden  translate-x-1/2 right-[50%]
           h-24 w-24"
        >
          <Image
            src="/images/image1.png"
            alt="profile"
            width={150}
            height={150}
            className="rounded-full "
          />
        </div>
        <div className=" px-3  items-center justify-center h-2/3  flex flex-col">
          {/* <Image src="/" alt="profile" className="rounded-full" width={150} height={150} /> */}
          <div className=" text-center pt-10 ">
            <h2 className="text-3xl  font-semibold "> Rabin Yadav</h2>
            <p className="text-base font-medium text-gray-300">
              Student | Freelancer
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
