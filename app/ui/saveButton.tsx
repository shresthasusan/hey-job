import { useState } from "react";
import { HeartIcon as Liked } from "@heroicons/react/24/solid";
import { HeartIcon as Unliked } from "@heroicons/react/24/outline";

interface SaveButtonProps {
  jobId: string;
  saved: boolean;
}

const SaveButton = ({ jobId, saved }: SaveButtonProps) => {
  const [isSaved, setIsSaved] = useState(saved);

  const toggleSave = async () => {
    try {
      const response = await fetch("/api/saveJob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });

      if (!response.ok) {
        throw new Error("Error saving/unsaving job");
      }

      const result = await response.json();
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // return <button onClick={toggleSave}>{isSaved ? "Unsave" : "Save"}</button>;
  return (
    <>
      {isSaved ? (
        <Liked onClick={toggleSave} className="w-6 h-6 text-red-600 " />
      ) : (
        <Unliked onClick={toggleSave} className="w-6 h-6  " />
      )}
    </>
  );
};

export default SaveButton;
