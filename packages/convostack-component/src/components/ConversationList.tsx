import { useGetConversationsQuery } from "@graphql";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createApiClient } from "../api/apiClient";
import { CustomIconsContext } from "../App";
import PencilSquareIcon from "../assets/PencilSquareIcon";
import XIcon from "../assets/XIcon";
import useConvoStack from "../hooks/useConvoStack";
import { setIsCreatingNewConversation } from "../redux/slice";
import ConversationListItem from "./ConversationListItem";
import LoaderSpinner from "./LoaderSpinner";

interface ConversationListProps {
  onClickClose: () => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  onClickClose,
}) => {
  const dispatch = useDispatch();
  const icons = useContext(CustomIconsContext);
  const { graphqlUrl, styling, userData } = useConvoStack();
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
      dispatch(setIsCreatingNewConversation(true));
    }
  }, [isFetching]);

  return (
    <>
      <div
        className={`w-full min-h-16 py-4 ${
          styling?.headerColor || "bg-blue-gradient"
        } sm:rounded-tl-lg sm:rounded-tr-lg sm:flex justify-between items-center hidden`}
      >
        <div
          className="left-0 absolute hover:cursor-pointer"
          onClick={() => dispatch(setIsCreatingNewConversation(true))}
        >
          {icons?.createNewConversationIcon || (
            <PencilSquareIcon className="w-6 h-6 ml-4" />
          )}
        </div>
        <div className="flex w-full">
          <p className="font-semibold mx-auto">
            {styling?.headerText || "Convo Stack Chat"}
          </p>
        </div>
      </div>
      <div
        className={`w-full min-h-36 ${
          styling?.headerColor || "bg-blue-gradient"
        } sm:rounded-tl-lg sm:rounded-tr-lg flex flex-wrap items-center py-4 sm:hidden justify-between`}
      >
        <div
          className="hover:cursor-pointer"
          onClick={() => dispatch(setIsCreatingNewConversation(true))}
        >
          {icons?.createNewConversationIcon || (
            <PencilSquareIcon className="w-6 h-6 ml-4" />
          )}
        </div>
        <div className="mx-auto">
          <p className="font-semibold mx-auto">
            {styling?.headerText || "Convo Stack Chat"}
          </p>
        </div>
        <div className="hover:cursor-pointer" onClick={onClickClose}>
          <XIcon className="w-6 h-6 mr-4" />
        </div>
      </div>
      <div className="bg-white flex-grow overflow-y-scroll flex flex-col sm:rounded-b-lg pb-4">
        {isLoading ? (
          <LoaderSpinner className="mx-auto mt-8" />
        ) : (
          <>
            {conversationArray.length !== 0 &&
              conversationArray.map((item, index) => (
                <div key={index}>
                  <ConversationListItem
                    title={item.title || ""}
                    headline={item.lastMessage?.content || ""}
                    updatedAt={item.lastMessage?.createdAt || ""}
                    conversationId={item.id}
                  />
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default ConversationList;
