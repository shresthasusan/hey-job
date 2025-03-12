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
        console.error("Invalid user selection");
        return;
      }

      const messagesRef = collection(db, "messages");
      const chatsRef = collection(db, "chats");

      const conversationExists = chatData?.find(
        (chat: ChatData) => chat.rId === selectedUser
      );

      if (conversationExists) {
        console.log(
          "Chat already exists for this proposal. Skipping creation."
        );
        return;
      }

      // Proceed with chat creation if it doesn't exist
      const initialMessage = `Regarding proposal  with bid amount $${proposal?.bidAmount}`;

      const newMessageRef = doc(messagesRef);
      await setDoc(newMessageRef, {
        createAt: serverTimestamp(),
        messages: [
          {
            sId: userData.id,
            text: initialMessage,
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
          lastMessage: initialMessage,
          rId: userData?.id,
          updateDoc: Date.now(),
          messageSeen: false,
          chatStatus: "open",
        }),
      });

      await updateDoc(doc(chatsRef, userData?.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: initialMessage,
          rId: selectedUser,
          updateDoc: Date.now(),
          messageSeen: true,
          chatStatus: "open",
        }),
      });

      console.log(`Chat created between ${userData?.id} and ${selectedUser}`);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl transition-transform transform scale-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold text-yellow-500 mb-6">
          Proposal Details
        </h2>
        <div className="space-y-4">
          <div className="border-b border-dotted pb-4">
            <p className="text-lg">
              <strong>Cover Letter:</strong> {proposal.coverLetter}
            </p>
          </div>
          <div className="border-b border-dotted pb-4">
            <p className="text-lg">
              <strong>Bid Amount:</strong> ${proposal.bidAmount}
            </p>
          </div>
          {proposal.attachments && (
            <div className="border-b border-dotted pb-4">
              <p className="text-lg">
                <strong>Attachments:</strong>
              </p>
              <a
                href={proposal.attachments}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 ml-2"
              >
                View Attachment
              </a>
            </div>
          )}
          <div className="border-b border-dotted pb-4">
            <p className="text-lg">
              <strong>Freelancer Name:</strong>{" "}
              {freelancer ? freelancer.fullName : "Loading..."}
            </p>
          </div>
          <div className="border-b border-dotted pb-4">
            <p className="text-lg">
              <strong>Created Time:</strong>{" "}
              {new Date(proposal.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="mt-6 justify-centre space-x-4">
          <Button
            onClick={() => addChat(freelancer?.userId, proposal)}
            outline={true}
          >
            Message
          </Button>
          <Link
            className="px-6 py-3 bg-green-400 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
            href={`/client/job-proposal/${proposal.jobId._id}/offer/${proposal.userId}/new`}
          >
            Hire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobProposalModal;
