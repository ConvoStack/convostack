import { useContext } from "react";
import { CustomIconsContext } from "../App";
import ArrowLeftIcon from "../assets/ArrowLeftIcon";
import XIcon from "../assets/XIcon";
import useConvoStack from "../hooks/useConvoStack";
import { useDispatch, useSelector } from "react-redux";
import { ConvoStackState, setIsConversationListVisible } from "../redux/slice";

interface HeaderProps {
  onClickClose: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClickClose }) => {
  const icons = useContext(CustomIconsContext);
  const { dropSubscription } = useConvoStack();
  const { styling } = useSelector(
    (state: any) => state.conversation as ConvoStackState
  );
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={`w-full min-h-36 ${
          styling?.headerColor ? "" : "bg-blue-gradient"
        } sm:rounded-tl-lg sm:rounded-tr-lg sm:flex flex-wrap items-center py-4 hidden`}
        style={{ backgroundColor: styling?.headerColor }}
      >
        <div
          className="left-0 absolute hover:cursor-pointer"
          onClick={() => {
            dispatch(setIsConversationListVisible(true));
            dropSubscription();
          }}
        >
          {icons?.backArrowIcon || (
            <ArrowLeftIcon
              className="w-6 h-6 ml-4"
              color={styling?.iconsColor || "white"}
            />
          )}
        </div>
        <div className="flex w-full">
          <p
            className="font-sans font-semibold mx-auto"
            style={{ color: styling?.headerTextColor || "white" }}
          >
            {styling?.headerText || "ConvoStack Chat"}
          </p>
        </div>
      </div>
      <div
        className={`w-full min-h-36 ${
          styling?.headerColor ? "" : "bg-blue-gradient"
        } sm:rounded-tl-lg sm:rounded-tr-lg flex justify-between items-center py-4 sm:hidden`}
        style={{ backgroundColor: styling?.headerColor }}
      >
        <div
          className="hover:cursor-pointer"
          onClick={() => {
            dispatch(setIsConversationListVisible(true));
            dropSubscription();
          }}
        >
          {icons?.backArrowIcon || (
            <ArrowLeftIcon
              className="w-6 h-6 ml-4"
              color={styling?.iconsColor || "white"}
            />
          )}
        </div>
        <p
          className="font-sans font-semibold mx-auto"
          style={{ color: styling?.headerTextColor || "white" }}
        >
          {styling?.headerText || "ConvoStack Chat"}
        </p>
        <div className="hover:cursor-pointer" onClick={onClickClose}>
          <XIcon
            className="w-6 h-6 mr-4"
            color={styling?.iconsColor || "white"}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
