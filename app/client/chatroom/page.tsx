import ChatWindow from "@/app/ui/chat-component/chatWindow";

interface searchParams {
  name: string;
}
interface Props {
  searchParams: searchParams | undefined;
}

const ChatRoom = ({ searchParams }: Props) => {
  const name = searchParams?.name || "";
  console.log(name);
  return <ChatWindow query={name} />;
};

export default ChatRoom;
