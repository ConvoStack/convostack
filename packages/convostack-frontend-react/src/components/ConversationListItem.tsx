import ArrowRightIcon from "../assets/ArrowRightIcon";
import useConvoStack from "../hooks/useConvoStack";
import DefaultAvatarUrl from "../images/DefaultAvatarUrl.png";

interface ConversationListProps {
  title: string;
  headline: string;
  updatedAt: string;
  conversationId: string | null;
  avatarUrl: string | null;
  embedId?: string;
}

const ConversationListItem: React.FC<ConversationListProps> = ({
  title,
  headline,
  updatedAt,
  conversationId,
  avatarUrl,
  embedId,
}) => {
  const { openConversation } = useConvoStack();
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
  const onConversationListItemClicked = async () => {
    if (embedId) {
      openConversation(conversationId, null, null, embedId);
    } else {
      openConversation(conversationId, null, null);
    }
  };

  return (
    <div
      className="py-2 text-left border-b-gray-300 border-b  items-center hover:cursor-pointer hover:bg-gray-200"
      onClick={onConversationListItemClicked}
    >
      <div className="flex flex-row">
        <img
          className="w-12 h-12 rounded-full mr-4 ml-4"
          src={avatarUrl || DefaultAvatarUrl}
          alt="Agent's Avatar"
        />
        <div className="mr-4 w-[calc(100%-96px)]">
          <div className="flex flex-row items-center justify-between">
            <p className="text-black font-semibold font-sm truncate overflow-hidden font-sans">
              {title}
            </p>
            <div className="flex flex-row items-center">
              <p className="text-gray-500 text-xs ml-1 line-clamp-1 font-sans">
                {updatedAt ? timeAgo(updatedAt) : ""}
              </p>
              <ArrowRightIcon className="h-3 w-3 ml-1" color="gray" />
            </div>
          </div>
          {headline ? (
            <p className="text-gray-500 text-xs truncate mt-1 font-sans">
              {headline}
            </p>
          ) : (
            <p className="text-gray-500 text-xs line-clamp-1 italic mt-1 font-sans">
              Ask a question
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationListItem;
