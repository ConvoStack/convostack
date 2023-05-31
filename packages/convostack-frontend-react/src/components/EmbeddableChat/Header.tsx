import { useContext } from "react";
import { CustomIconsContext } from "../../App";
import ArrowLeftIcon from "../../assets/ArrowLeftIcon";
import useConvoStack from "../../hooks/useConvoStack";
import { setIsEmbedConversationListVisible } from "../../redux/slice";
import { useDispatch } from "react-redux";
import { CustomEmbedStyling } from "../../types";

interface HeaderProps {
  embedId: string;
  customStyling?: CustomEmbedStyling;
}

const Header: React.FC<HeaderProps> = ({ embedId, customStyling }) => {
  const icons = useContext(CustomIconsContext);
  const dispatch = useDispatch();
  const { dropSubscription } = useConvoStack();
  return (
    <div className="w-full">
      <div
        className={`w-full h-14 ${
          customStyling?.headerColor ? "" : "bg-blue-gradient"
        } flex flex-wrap items-center py-4`}
        style={{ backgroundColor: customStyling?.headerColor }}
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
              className="w-6 h-6 ml-3"
              color={customStyling?.iconsColor || "white"}
            />
          )}
        </div>
        <div className="flex mx-auto">
          <p
            className="font-sans font-semibold mx-auto"
            style={{ color: customStyling?.headerTextColor || "white" }}
          >
            {customStyling?.headerText || "ConvoStack Chat"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
