import { useState } from "react";
import { HeartIcon as Liked } from "@heroicons/react/24/solid";
import { HeartIcon as Unliked } from "@heroicons/react/24/outline";

interface SaveButtonProps {
  itemId?: string;
  saved?: boolean;
  itemType: "job" | "freelancer"; // Add itemType prop to specify the type of item
}

const SaveButton = ({ itemId, saved, itemType }: SaveButtonProps) => {
  const [isSaved, setIsSaved] = useState(saved);

  const toggleSave = async () => {
    try {
      const endpoint =
        itemType === "job" ? "/api/saveJob" : "/api/saveFreelancer";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [`${itemType}Id`]: itemId }), // Dynamically set the key based on itemType
      });

      if (!response.ok) {
        throw new Error(`Error saving/unsaving ${itemType}`);
      }

      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
