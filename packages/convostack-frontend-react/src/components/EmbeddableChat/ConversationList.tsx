import { useGetConversationsQuery } from "@graphql";
import { useContext, useEffect } from "react";
import { createApiClient } from "../../api/apiClient";
import { CustomIconsContext } from "../../App";
import PencilSquareIcon from "../../assets/PencilSquareIcon";
import useConvoStack from "../../hooks/useConvoStack";
import ConversationListItem from "../ConversationListItem";
import LoaderSpinner from "../LoaderSpinner";

interface ConversationListProps {
  id: string;
}

const ConversationList: React.FC<ConversationListProps> = ({ id }) => {
  const icons = useContext(CustomIconsContext);
  const { graphqlUrl, styling, userData, openConversation } = useConvoStack();
  const { data, isFetching, isLoading } = useGetConversationsQuery(
    createApiClient(graphqlUrl, userData),
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
      openConversation(null, undefined, undefined, id);
    }
  }, [isFetching]);

  return (
    <>
      <div
        className={`py-4 ${
          styling?.headerColor || "bg-blue-gradient"
        } flex justify-between items-center`}
      >
        <div
          className="left-0 hover:cursor-pointer"
          onClick={() => openConversation(null, undefined, undefined, id)}
        >
          {icons?.createNewConversationIcon || (
            <PencilSquareIcon className="w-6 h-6 ml-4" />
          )}
        </div>
        <div className="flex w-full">
          <p className="font-semibold mx-auto">
            {styling?.headerText || "ConvoStack Chat"}
          </p>
        </div>
      </div>
      <div className="h-[312px] bg-white overflow-y-scroll flex flex-col pb-4">
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
                  id={id}
                />
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default ConversationList;
