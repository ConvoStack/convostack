import ArrowRightIcon from "../assets/ArrowRightIcon";
import useConvoStack from "../hooks/useConvoStack";

interface ConversationListProps {
  title: string;
  headline: string;
  updatedAt: string;
  conversationId: string | null;
}

const ConversationListItem: React.FC<ConversationListProps> = ({
  title,
  headline,
  updatedAt,
  conversationId,
}) => {
  const { setActiveConversationId, showConversationListHelper } =
    useConvoStack();
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((Number(now) - Number(date)) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (seconds < 60) {
      return "Just now";
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days < 7) {
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  const onConversationListItemClicked = () => {
    showConversationListHelper(false);
    setActiveConversationId(conversationId);
  };

  return (
    <div
      className="py-2 text-left border-b-gray-300 border-b  items-center hover:cursor-pointer hover:bg-gray-200"
      onClick={onConversationListItemClicked}
    >
      <div className="flex flex-row">
        <img
          className="w-12 h-12 rounded-full mr-4 ml-4"
          src="https://cdn.pixabay.com/photo/2017/10/24/00/39/bot-icon-2883144_960_720.png"
          alt="Rounded avatar"
        />
        <div className="mr-4 w-[calc(100%-96px)]">
          <div className="flex flex-row items-center justify-between">
            <p className="text-black font-semibold font-sm truncate w-9/12">
              {title}
            </p>
            <div className="flex flex-row items-center">
              <p className="text-gray-500 text-xs ml-1 line-clamp-1">
                {updatedAt ? timeAgo(updatedAt) : ""}
              </p>
              <ArrowRightIcon className="h-3 w-3 ml-1" color="gray" />
            </div>
          </div>
          {headline ? (
            <p className="text-gray-500 text-xs truncate mt-1">
              akjsdfkajsasdfasdfaajsdlfkjasldkjfalksjdflkjaslkdfj
            </p>
          ) : (
            <p className="text-gray-500 text-xs line-clamp-1 italic mt-1">
              Ask a question
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationListItem;
