import { useConvoStack } from "convostack/frontend-react";

interface MyComponentProps {
  text: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ text }) => {
  const {
    toggleWidgetWindow,
    isWidgetWindowVisible,
    openConversationList,
    openConversation,
  } = useConvoStack();
  return (
    <div className="flex flex-col">
      <p className="text-black">{text}</p>
      <button
        onClick={() => toggleWidgetWindow(!isWidgetWindowVisible)}
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
    </div>
  );
};

export default MyComponent;
