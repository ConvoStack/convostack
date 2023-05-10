import useConvoStack from "../hooks/useConvoStack";

interface MyComponentProps {
  text: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ text }) => {
  const {
    setIsConversationWindowVisible,
    isConversationWindowVisible,
    openConversationListWindow,
    openChatWindow,
    activeConversationId,
  } = useConvoStack();
  return (
    <div className="flex flex-col">
      <p className="text-black">{text}</p>
      <button
        onClick={() =>
          setIsConversationWindowVisible(!isConversationWindowVisible)
        }
        className="bg-red-500 mb-8"
      >
        test toggle open/close convostack
      </button>
      <button
        onClick={() => openConversationListWindow()}
        className="bg-red-500 mb-8"
      >
        open conversation list
      </button>
      <button onClick={() => openChatWindow(null)} className="bg-red-500 mb-8">
        open new chat
      </button>
    </div>
  );
};

export default MyComponent;
