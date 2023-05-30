import { useContext } from "react";
import { CustomIconsContext } from "../../App";
import ArrowLeftIcon from "../../assets/ArrowLeftIcon";
import useConvoStack from "../../hooks/useConvoStack";
import {
  ConvoStackState,
  setIsEmbedConversationListVisible,
} from "../../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { CustomEmbedStyling } from "../../types";

interface HeaderProps {
  embedId: string;
  customStyling?: CustomEmbedStyling;
}

const Header: React.FC<HeaderProps> = ({ embedId, customStyling }) => {
  const icons = useContext(CustomIconsContext);
  const dispatch = useDispatch();
  const { dropSubscription } = useConvoStack();
  const { styling } = useSelector(
    (state: any) => state.conversation as ConvoStackState
  );
  return (
    <div className="w-full">
      <div
        className={`w-full h-14 ${
          styling?.headerColor || "bg-blue-gradient"
        } flex flex-wrap items-center py-4`}
      >
        <div
          className="left-0 hover:cursor-pointer"
          onClick={() => {
            dispatch(
              setIsEmbedConversationListVisible({
                embedId: embedId,
                value: true,
              })
            );
            dropSubscription(embedId);
          }}
        >
          {icons?.backArrowIcon || (
            <ArrowLeftIcon
              className="w-6 h-6 ml-4"
              color={customStyling?.iconsColor || "white"}
            />
          )}
        </div>
        <div className="flex mx-auto">
          <p
            className={`font-sans font-semibold mx-auto ${
              styling?.headerTextColor || "text-white"
            }`}
          >
            {styling?.headerText || "Convo Stack Chat"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
