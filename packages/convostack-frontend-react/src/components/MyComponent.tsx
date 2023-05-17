import { useConvoStack } from "../index";

interface MyComponentProps {
  text: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ text }) => {
  const {
    toggleWidget,
    isConversationWindowVisible,
    openConversationList,
    openConversation,
  } = useConvoStack();
  return (
    <div className="flex flex-col">
      <p className="text-black">{text}</p>
      <button
        onClick={() => toggleWidget(!isConversationWindowVisible)}
        className="bg-red-500 mb-8"
      >
        test toggle open/close convostack
      </button>
      <button
        onClick={() => openConversationList()}
        className="bg-red-500 mb-8"
      >
        open conversation list
      </button>
      <button
        onClick={() => openConversation(null)}
        className="bg-red-500 mb-8"
      >
        open new chat
      </button>
      <button
        onClick={() => openConversation(null, undefined, undefined, "test")}
        className="bg-red-500 mb-8"
      >
        open embed chat
      </button>
      <button
        onClick={() => openConversationList("test")}
        className="bg-red-500 mb-8"
      >
        open embed convo list
      </button>
    </div>
  );
};

export default MyComponent;
