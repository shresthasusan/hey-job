"use client";

import {
  BriefcaseIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Button } from "../button";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const ModeSelect = () => {
  const router = useRouter();
  const [mode, setMode] = useState("");

  interface SelectProps {
    selected: boolean; //interface for Circle component
  }

  const handleModeSelection = (selectedMode: string) => {
    setMode(selectedMode);
  };

  const Circle = ({ selected }: SelectProps) => (
    <div
      className={clsx(
        "rounded-full border-2 h-8 w-8 absolute top-3 right-3 flex items-center justify-center",
        selected && "bg-primary-600"
      )}
    >
      {selected && <div className="rounded-full h-5 w-5 border-2"></div>}
    </div>
  );
  const handleContinue = () => {
    if (!mode) {
      console.log("Please select a mode");
      return;
    }
    router.push(`/signup/${mode}`);
  };

  return (
    <div className="flex flex-col items-center top-2/3 mt-[10%] h-screen">
      <div className="text-4xl">Join as a client or freelancer</div>
      <div className="input flex gap-9 mt-10">
        <button
          className={clsx(
            "h-44 border-2 w-60 relative rounded-xl",
            mode === "client" && "border-primary-600"
          )}
          onClick={() => handleModeSelection("client")}
        >
          <Circle selected={mode === "client"} />
          <BriefcaseIcon className="h-10 w-10 absolute top-2 left-3" />
          <p className="text-xl">I&apos;m a client, looking for freelancers</p>
        </button>
        <button
          className={clsx(
            "h-44 border-2 w-60 relative rounded-xl",
            mode === "freelancer" && "border-primary-600"
          )}
          onClick={() => handleModeSelection("freelancer")}
        >
          <Circle selected={mode === "freelancer"} />
          <ComputerDesktopIcon className="h-10 w-10 absolute top-2 left-3" />
          <p className="text-xl text-left ml-2">
            I&apos;m a Freelancer, looking for work
          </p>
        </button>
      </div>
      <Button
        className={clsx(
          "button bg-primary-600 rounded-xl p-6 mt-5 text-white",
          !mode && "cursor-not-allowed opacity-50 disabled"
        )}
        onClick={handleContinue}
      >
        {(mode === "client" && "Continue as a client") ||
          (mode === "freelancer" && "Continue as a freelancer") ||
          "Continue"}
      </Button>
    </div>
  );
};

export default ModeSelect;
