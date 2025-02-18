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
import { useEffect } from "react";

const WelcomeText = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userName = session?.user.name;

  const id = session?.user.id;

  useEffect(() => {
    if (status !== "authenticated") return;

    fetch("/api/user?fields=roles") // ✅ Fetch only roles from API
      .then((res) => res.json())
      .then((data) => {
        if (data.roles.client) router.push(`/client/best-matches`);
      })
      .catch((err) => console.error("Error fetching roles:", err));
  }, [status, session, router]);
  return (
    <div className="flex flex-col items-center top-2/3 justify-center h-screen">
      <div className="text-4xl">
        Hey <span>{userName}. </span>
        We&apos;re thrilled to partner with you,
        <TypingAnimation
          text=" Welcome aboard!"
          startDelay={0}
          className="text-primary-600"
          interval={134}
        />
      </div>
      <div className="text-2xl mt-10">
        Ready to take your business to the next level? Let&apos;s begin with a
        few quick details.
      </div>
      <div className="text-xl mt-10 flex  ">
        <UserIcon className="h-7 w-7 p-1 text-primary-600 " /> Answer few
        questions before you start posting jobs. {"  "}|{" "}
        <DocumentCheckIcon className="h-7 w-7 p-1 text-primary-600" /> List jobs
        or search for suitable freelancers|{" "}
        <BanknotesIcon className="h-7 w-7 p-1 text-primary-600" /> Pay for the
        services you receive.
      </div>

      <Button
        className="mt-10 text-white p-5 "
        onClick={() => {
          router.push(`/signup/client/${id}`);
        }}
      >
        Get Started
      </Button>
    </div>
  );
};

export default WelcomeText;
