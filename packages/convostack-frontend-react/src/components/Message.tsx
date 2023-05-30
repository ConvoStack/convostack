import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface MessageProps {
  width: string;
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
      className={`font-sans rounded-lg px-4 py-2 break-words mt-2 ${
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
        components={{
          h1: ({ ...props }) => <h1 className="text-4xl" {...props} />,
          h2: ({ ...props }) => <h2 className="text-3xl" {...props} />,
          h3: ({ ...props }) => <h3 className="text-2xl" {...props} />,
          ol: ({ ...props }) => (
            <ol className="list-decimal list-inside" {...props} />
          ),
          ul: ({ ...props }) => (
            <ul className="list-disc list-inside" {...props} />
          ),
          blockquote: ({ ...props }) => (
            <blockquote
              className="border-l-4 border-gray-300 pl-4 my-4"
              {...props}
            />
          ),
          code: ({ ...props }) => (
            <code
              className="text-sm bg-gray-200 p-1 rounded-md whitespace-pre-wrap break-all"
              {...props}
              style={{ whiteSpace: "pre-line" }}
            />
          ),
          a: ({ ...props }) => (
            <a className="underline" target="_blank" {...props} />
          ),
        }}
      />
    </div>
  );
};

export default Message;
