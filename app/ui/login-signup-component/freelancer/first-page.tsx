"use client";

import {
  BanknotesIcon,
  DocumentCheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { Button } from "../../button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { set } from "mongoose";
import { clear } from "console";

const WelcomeText = () => {
  const router = useRouter();
  const { data: session } = useSession();
  // if (!session) {
  //   router.push("/login");
  // }
  const LetterPop = ({ word }: { word: string }) => {
    const [displayedLetters, setDisplayedLetters] = useState<string[]>([]);

    useEffect(() => {
      const letters = word.split("");
      let index = 0;

      const interval = setInterval(() => {
        setDisplayedLetters((prev) => [...prev, letters[index]]);
        index++;
        if (index >= letters.length) {
          clearInterval(interval);
        }
      }, 200);

      return () => clearInterval(interval);
    }, [word]);
    console.log(displayedLetters, "displayed");

    return (
      <span className="text-primary-600">
        {displayedLetters.map((letter, idx) => (
          <span key={idx}>{letter}</span>
        ))}
      </span>
    );
  };

  return (
    <div className="flex flex-col items-center top-2/3 mt-[10%] h-screen">
      <div className="text-4xl">
        hey <span>{session?.user.name}</span>. Are you ready for your next big{" "}
        <LetterPop word="Endeavour?" />
      </div>
      <div className="text-2xl mt-10">
        Let's get started by filling out some basic information.
      </div>
      <div className="text-xl mt-10 flex  ">
        <UserIcon className="h-7 w-7 p-1 text-primary-600 " /> Answer few
        questions and start building your profile. {"  "}|{" "}
        <DocumentCheckIcon className="h-7 w-7 p-1 text-primary-600" /> Apply for
        open roles or list services for clients to buy |{" "}
        <BanknotesIcon className="h-7 w-7 p-1 text-primary-600" /> Get paid for
        your work.
      </div>
      <Button className="mt-10 text-white p-5">Get Started</Button>
    </div>
  );
};

export default WelcomeText;
