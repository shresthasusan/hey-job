"use client";

import {
  BanknotesIcon,
  DocumentCheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { Button } from "../../button";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/models/user";
import { start } from "repl";

const WelcomeText = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const userName = session?.user.name;
  // await connectMongoDB();
  // const user = await User.findOne({ name: userName }).select("_id");
  // const id = user?._id;
  const _id = "1";
  // if (!session) {
  //   router.push("/login");
  // }
  const TextTyper = ({ text = "", className = "", startDelay = 0 }) => {
    const interval = 134;
    const [typedText, setTypedText] = useState<string>("");
    const hasStarted = useRef(false);
    useEffect(() => {
      if (hasStarted.current) return;
      let localTypingIndex = 0;
      let localTyping = "";

      const startTimeout = setTimeout(() => {
        const printer = setInterval(() => {
          if (localTypingIndex < text.length) {
            localTyping += text[localTypingIndex];
            setTypedText(localTyping);
            localTypingIndex += 1;
          } else {
            clearInterval(printer);
            hasStarted.current = true;
          }
        }, interval);

        return () => clearInterval(printer); // Cleanup the interval on component unmount
      }, startDelay);

      return () => clearInterval(startTimeout); // Cleanup the interval on component unmount
    }, [text, startDelay]);

    return <span className={`${className}`}>{typedText}</span>;
  };

  return (
    <div className="flex flex-col items-center top-2/3 mt-[10%] h-screen">
      <div className="text-4xl">
        Hey <span>{userName}. </span>
        {/* <TextTyper text=" Are you ready for your next big" />{" "}
         */}
        Are you ready for your next big
        <TextTyper
          text=" Endeavour?"
          startDelay={0}
          className="text-primary-600"
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
      <Link href={`/freelancer/forms-${_id}`}>
        <Button className="mt-10 text-white p-5">Get Started</Button>
      </Link>
    </div>
  );
};

export default WelcomeText;
