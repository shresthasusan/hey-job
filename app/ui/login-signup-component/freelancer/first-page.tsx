"use client";

import {
  BanknotesIcon,
  DocumentCheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { Button } from "../../button";

// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import TypingAnimation from "../../typingAnimation";

const WelcomeText = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const userName = session?.user.name;

  const id = session?.user.id;

  // if (!session) {
  //   router.push("/login");
  // }
  if (session?.user.roles.freelancer) {
    router.push("/");
  }
  return (
    <div className="flex flex-col items-center top-2/3 justify-center h-screen">
      <div className="text-4xl">
        Hey <span>{userName}. </span>
        {/* <TextTyper text=" Are you ready for your next big" />{" "}
         */}
        Are you ready for your next big
        <TypingAnimation
          text=" Endeavour?"
          startDelay={0}
          className="text-primary-600"
          interval={134}
        />
      </div>
      <div className="text-2xl mt-10">
        Let&apos;s get started by filling out some basic information.
      </div>
      <div className="text-xl mt-10 flex  ">
        <UserIcon className="h-7 w-7 p-1 text-primary-600 " /> Answer few
        questions and start building your profile. {"  "}|{" "}
        <DocumentCheckIcon className="h-7 w-7 p-1 text-primary-600" /> Apply for
        open roles or list services for clients to buy |{" "}
        <BanknotesIcon className="h-7 w-7 p-1 text-primary-600" /> Get paid for
        your work.
      </div>

      <Button
        className="mt-10 text-white p-5 "
        onClick={() => {
          router.push(`/signup/freelancer/${id}`);
        }}
      >
        Get Started
      </Button>
    </div>
  );
};

export default WelcomeText;
