import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageProps {
  message: { text: string; author: string };
  className?: string;
}

const Message: React.FC<MessageProps> = ({ message, className = "" }) => {
  return (
    <div
      className={`rounded-lg px-4 py-2 break-words mt-2 max-w-[240px] ${
        message.author === "AI"
          ? "bg-slate-200 mr-auto ml-4 inline-block text-black"
          : "bg-blue-500 ml-auto mr-4 inline-block text-white"
      } ${className}`}
      style={{ whiteSpace: "pre-line" }}
    >
      <ReactMarkdown
        children={message.text}
        remarkPlugins={[remarkGfm]}
        className="text-sm text-left"
      />
    </div>
  );
};

export default Message;
