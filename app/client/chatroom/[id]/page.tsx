import ChatWindow from "@/app/ui/chat-component/chatWindow";

const ChatRoom = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <ChatWindow uId={id} />;
};

export default ChatRoom;
