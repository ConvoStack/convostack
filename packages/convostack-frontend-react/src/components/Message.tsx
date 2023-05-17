import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageProps {
  width: null | string;
  message: { text: string; author: string };
  className?: string;
}

const Message: React.FC<MessageProps> = ({
  width,
  message,
  className = "",
}) => {
  return (
    <div
      className={`rounded-lg px-4 py-2 break-words mt-2 ${
        message.author === "AI"
          ? "bg-slate-200 mr-auto ml-4 inline-block text-black"
          : "bg-blue-500 ml-auto mr-4 inline-block text-white"
      } ${className}`}
      style={{ whiteSpace: "pre-line", maxWidth: `calc(${width} - 130px)` }}
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
