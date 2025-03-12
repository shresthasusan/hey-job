import React, { useContext, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import Link from "next/link";
import { Button } from "../../button";
import { db } from "@/app/lib/firebase";
import { serverTimestamp } from "firebase/database";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { Appcontext } from "@/app/context/appContext";
import UserProfileLoader from "@/app/lib/userProfileLoader";

interface Proposal {
  id: string;
  jobId: {
    _id: string;
  };
  userId: string;
  clientId: string;
  attachments: string;
  coverLetter: string;
  bidAmount: number;
  createdAt: string;
}

interface Freelancer {
  userId: string;
  fullName: string;
  profilePicture: string;
}

interface JobProposalModalProps {
  proposal: Proposal;
  onClose: () => void;
}

interface UserData {
  id: string;
}

type ChatDataItem = {
  messageId: string;
  lastMessage: string;
  rId: string;
  updateDoc: number;
  messageSeen: boolean;
  userData: UserData;
  user: UserData;
  proposalDetails: Proposal;
  lastMessageSender?: string;
};

const JobProposalModal: React.FC<JobProposalModalProps> = ({
  proposal,
  onClose,
}) => {
  interface AppContextValue {
    userData: UserData | null;
    setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
    chatData: ChatDataItem[] | null;
    setChatData: React.Dispatch<React.SetStateAction<ChatDataItem[] | null>>;
    loadUserData: (uid: string) => Promise<void>;
    messages: any; // Replace `any` with a specific type if possible
    setMessages: React.Dispatch<React.SetStateAction<any>>;
    messagesId: string | null;
    setMessagesId: React.Dispatch<React.SetStateAction<string | null>>;
  }

  const context = useContext(Appcontext) as AppContextValue;
  const { userData, chatData } = context;
  const [freelancer, setFreelancer] = useState<Freelancer | null>(null);
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        const response = await fetchWithAuth(
          `/api/freelancers?userId=${proposal.userId}`
        );
        const data = await response.json();
        setFreelancer(data.freelancer);
      } catch (error) {
        console.error("Error fetching freelancer data:", error);
      }
    };
    fetchFreelancer();
  }, [proposal.userId]);

  interface ChatData {
    messageId: string;
    lastMessage: string;
    rId: string;
    updateDoc: number;
    messageSeen: boolean;
  }

  const addChat = async (
    selectedUser: string | undefined,
    proposal?: Proposal
  ) => {
    try {
      if (!selectedUser || !userData?.id) {
        console.error("Invalid user selection", userData?.id);
        return;
      }

      const messagesRef = collection(db, "messages");
      const chatsRef = collection(db, "chats");

      const conversationExists = chatData?.find(
        (chat: ChatData) => chat.rId === selectedUser
      );

      if (conversationExists) {
        console.log("Chat already exists.");
        alert("you've already send a message regarding this proposal");
        return;
      }

      const newMessageRef = doc(messagesRef);
      await setDoc(newMessageRef, {
        createAt: serverTimestamp(),
        messages: [
          {
            sId: userData.id,
            text: message,
            createdAt: Date.now(),
          },
        ],
      });

      await updateDoc(doc(db, "messages", newMessageRef.id), {
        messages: arrayUnion({
          sId: userData.id,
          attachment: {
            type: "proposalDetails",
            data: proposal,
          },
          createdAt: new Date(),
        }),
      });

      // Update both users' chat collections
      await updateDoc(doc(chatsRef, selectedUser), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: message,
          rId: userData?.id,
          updateDoc: Date.now(),
          messageSeen: false,
          chatStatus: "open",
        }),
      });

      await updateDoc(doc(chatsRef, userData?.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: message,
          rId: selectedUser,
          updateDoc: Date.now(),
          messageSeen: true,
          chatStatus: "open",
        }),
      });

      console.log(`Chat created between ${userData?.id} and ${selectedUser}`);
      setShowMessageInput(false);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold text-yellow-500 mb-6">
          Proposal Details
        </h2>
        <div className="space-y-4">
          <p className="text-lg">
            <strong>Cover Letter:</strong> {proposal.coverLetter}
          </p>
          <p className="text-lg">
            <strong>Bid Amount:</strong> ${proposal.bidAmount}
          </p>
          {proposal.attachments && (
            <p className="text-lg">
              <strong>Attachments:</strong>
              <a
                href={proposal.attachments}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 ml-2"
              >
                View Attachment
              </a>
            </p>
          )}
          <p className="text-lg">
            <strong>Freelancer Name:</strong>{" "}
            {freelancer ? freelancer.fullName : "Loading..."}
          </p>
          <p className="text-lg">
            <strong>Created Time:</strong>{" "}
            {new Date(proposal.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-6 space-x-4">
          <Button onClick={() => setShowMessageInput(true)} outline>
            Message
          </Button>
          <Link
            className="px-6 py-3 bg-green-400 text-white rounded-full hover:bg-green-700"
            href={`/client/job-proposal/${proposal.jobId._id}/offer/${proposal.userId}/new`}
          >
            Hire
          </Link>
        </div>
      </div>
      {showMessageInput && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <UserProfileLoader />
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Send a Message</h3>
            <textarea
              className="w-full p-2 border rounded-lg"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex justify-end mt-4 space-x-4">
              <Button onClick={() => setShowMessageInput(false)} outline>
                Cancel
              </Button>
              <Button onClick={() => addChat(freelancer?.userId, proposal)}>
                Send Message
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobProposalModal;
