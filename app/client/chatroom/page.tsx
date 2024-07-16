import ChatWindow from "@/app/ui/chat-component/chatWindow";
import { captureRejectionSymbol } from "events";

interface searchParams {
  name: string;
}
interface Props {
  searchParams: searchParams | undefined;
}

const ChatRoom = ({ searchParams }: Props) => {
  const name = searchParams?.name || "";

  return <ChatWindow query={name} />;
};

export default ChatRoom;
