import { useGetConversationsQuery } from "@graphql";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { createApiClient } from "../../api/apiClient";
import { CustomIconsContext } from "../../App";
import PencilSquareIcon from "../../assets/PencilSquareIcon";
import useConvoStack from "../../hooks/useConvoStack";
import { ConvoStackState } from "../../redux/slice";
import { CustomEmbedStyling } from "../../types";
import ConversationListItem from "../ConversationListItem";
import LoaderSpinner from "../LoaderSpinner";

interface ConversationListProps {
  embedId: string;
  style: React.CSSProperties;
  customStyling?: CustomEmbedStyling;
}

const ConversationList: React.FC<ConversationListProps> = ({
  embedId,
  style,
  customStyling,
}) => {
  const icons = useContext(CustomIconsContext);
  const { openConversation, context } = useConvoStack();
  const { styling, defaultAgent } = useSelector(
    (state: any) => state.conversation as ConvoStackState
  );
  const { data, isFetching, isLoading } = useGetConversationsQuery(
    createApiClient(),
    undefined,
    {
      staleTime: 0,
    }
  );
  const conversationArray =
    data !== undefined &&
    data?.getConversations !== null &&
    data?.getConversations !== undefined &&
    data?.getConversations.length > 0
      ? data.getConversations
      : [];

  useEffect(() => {
    if (!isFetching && conversationArray.length === 0) {
      openConversation(null, defaultAgent, context, embedId);
    }
  }, [isFetching]);

  return (
    <>
      <div
        className={`h-14 py-4 ${
          styling?.headerColor || "bg-blue-gradient"
        } flex justify-between items-center`}
      >
        <div
          className="left-0 hover:cursor-pointer"
          onClick={() => openConversation(null, defaultAgent, context, embedId)}
        >
          {icons?.createNewConversationIcon || (
            <PencilSquareIcon
              className="w-6 h-6 ml-4"
              color={customStyling?.iconsColor || "white"}
            />
          )}
        </div>
        <div className="flex w-full">
          <p
            className={`font-sans font-semibold mx-auto ${
              styling?.headerTextColor || "text-white"
            }`}
          >
            {styling?.headerText || "ConvoStack Chat"}
          </p>
        </div>
      </div>
      <div
        className="bg-white overflow-y-auto flex flex-col pb-4"
        style={style}
      >
        {isLoading ? (
          <LoaderSpinner className="mx-auto mt-8" />
        ) : (
          <>
            {conversationArray.length !== 0 &&
              conversationArray.map((item, index) => (
                <ConversationListItem
                  key={index}
                  title={item.title || ""}
                  headline={item.lastMessage?.content || ""}
                  updatedAt={item.lastMessage?.createdAt || ""}
                  conversationId={item.id}
                  avatarUrl={item.agent.avatarUrl || ""}
                  embedId={embedId}
                />
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default ConversationList;
