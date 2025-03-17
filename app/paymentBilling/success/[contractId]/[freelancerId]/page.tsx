"use client";

import { Suspense, useCallback, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { generateEsewaSignature } from "@/app/lib/generateEsewaSignature"; // Import your signature generator
import { Appcontext } from "@/app/context/appContext";
import { db } from "@/app/lib/firebase";
import {
  collection,
  updateDoc,
  doc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "@/app/providers";

interface PaymentDetails {
  transaction_code: string;
  status: string;
  total_amount: string;
  transaction_uuid: string;
  product_code: string;
  signature?: string; // Added signature field
  [key: string]: any;
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
  lastMessageSender?: string;
  proposalArray?: [proposalId: string];
};

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

interface Props {
  contractId: string;
  freelancerId: string;
}

const PaymentSuccessContent = ({ contractId, freelancerId }: Props) => {
  const { session } = useAuth();

  const { loadUserData } = useContext(Appcontext);

  const [error, setError] = useState<string | null>(null);
  const context = useContext(Appcontext) as AppContextValue;
  const { userData, chatData } = context;

  const closeChat = useCallback(async () => {
    try {
      console.log("Closing chat...");
      const userId = userData?.id;
      const conversationExists = chatData?.find(
        (chat: ChatDataItem) => chat.rId === freelancerId
      );

      if (!conversationExists) {
        console.log("freelancerId", freelancerId);
        console.log("userId", userId);
        console.log("no chat");
        return;
      }

      const messagesRef = collection(db, "messages");
      const chatsRef = collection(db, "chats");
      const message = "paid the due amount";
      const eMessageId = conversationExists.messageId;

      await updateDoc(doc(db, "messages", eMessageId), {
        messages: arrayUnion({
          sId: userData?.id,
          text: message,
          createdAt: new Date(),
        }),
      });

      const userIDs = [freelancerId, userId];

      userIDs.forEach(async (id) => {
        const selectedUserChatRef = doc(chatsRef, id);
        const UserChatSnap = await getDoc(selectedUserChatRef);

        if (UserChatSnap.exists()) {
          const UserChatData = UserChatSnap.data();

          const chatIndex = UserChatData.chatsData.findIndex(
            (c: ChatDataItem) => c.messageId === eMessageId
          );

          if (chatIndex !== -1) {
            let updatedChatsData = [...UserChatData.chatsData];

            updatedChatsData[chatIndex].ContractArray =
              updatedChatsData[chatIndex].ContractArray?.filter(
                (id: string) => id !== contractId
              ) || [];

            if (updatedChatsData[chatIndex].ContractArray.length === 0) {
              updatedChatsData[chatIndex].chatStatus = "closed";
            }
            updatedChatsData[chatIndex].lastMessage = message;
            updatedChatsData[chatIndex].updatedAt = Date.now();
            updatedChatsData[chatIndex].messageSeen = false;

            await updateDoc(selectedUserChatRef, {
              chatsData: updatedChatsData,
            });
          }
        }
      });
      console.log("chatc closded");
    } catch (error) {
      console.error("Error closing chat:", error);
    }
  }, [userData, chatData, freelancerId, contractId]);

  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const [verifiedSignature, setVerifiedSignature] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    if (!session) {
      console.log("no session");
      return;
    }
    loadUserData(session?.user.id);
    closeChat();
    if (data) {
      try {
        const decodedData = decodeURIComponent(data);
        const parsedData = JSON.parse(atob(decodedData)) as PaymentDetails;
        setPaymentDetails(parsedData);

        // Verify signature if present
        // if (parsedData.signature) {
        //   const secretKey = process.env.NEXT_PUBLIC_ESEWA_SECRET_KEY; // Note: Avoid exposing this client-side
        //   if (secretKey) {
        //     const signatureString = `total_amount=${parsedData.total_amount},transaction_uuid=${parsedData.transaction_uuid},product_code=${parsedData.product_code}`;
        //     const localSignature = generateEsewaSignature(
        //       secretKey,
        //       signatureString
        //     );
        //     setVerifiedSignature(localSignature === parsedData.signature);
        //   }
        // }
      } catch (error) {
        console.error("Error parsing payment data:", error);
      }
    }
  }, [data, closeChat]);

  if (!paymentDetails) {
    return <div className="text-center p-10">Loading payment details...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-600">
          Payment Successful ✅
        </h2>
        <p className="mt-2 text-gray-600">Thank you for your payment!</p>

        <div className="mt-4 text-left">
          <p>
            <strong>Transaction Code:</strong> {paymentDetails.transaction_code}
          </p>
          <p>
            <strong>Status:</strong> {paymentDetails.status}
          </p>
          <p>
            <strong>Amount:</strong> NPR {paymentDetails.total_amount}
          </p>
          <p>
            <strong>Transaction ID:</strong> {paymentDetails.transaction_uuid}
          </p>
          <p>
            <strong>Product Code:</strong> {paymentDetails.product_code}
          </p>
          {paymentDetails.signature && (
            <>
              <p>
                <strong>Signature:</strong> {paymentDetails.signature}
              </p>
              {verifiedSignature !== null && (
                <p>
                  <strong>Signature Verification:</strong>{" "}
                  <span
                    className={
                      verifiedSignature ? "text-green-600" : "text-red-600"
                    }
                  >
                    {verifiedSignature ? "Verified" : "Not Verified"}
                  </span>
                </p>
              )}
            </>
          )}
        </div>

        <div className="mt-6 text-left w-full">
          <h3 className="text-lg font-semibold">Full Payment Data:</h3>
          <pre className="bg-gray-200 p-4 rounded-md text-sm overflow-x-auto">
            {JSON.stringify(paymentDetails, null, 2)}
          </pre>
        </div>

        <button
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          onClick={() => (window.location.href = "/dashboard")} // Adjust redirect as needed
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

const PaymentSuccess = ({
  params,
}: {
  params: { contractId: string; freelancerId: string };
}) => {
  const { contractId, freelancerId } = params;
  return (
    <Suspense
      fallback={
        <div className="text-center p-10">Loading payment details...</div>
      }
    >
      <PaymentSuccessContent
        contractId={contractId}
        freelancerId={freelancerId}
      />
    </Suspense>
  );
};

export default PaymentSuccess;
