import { useContext } from "react";
import { CustomIconsContext } from "../App";
import ArrowLeftIcon from "../assets/ArrowLeftIcon";
import XIcon from "../assets/XIcon";
import useConvoStack from "../hooks/useConvoStack";

interface HeaderProps {
  onClickClose: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClickClose }) => {
  const icons = useContext(CustomIconsContext);
  const { setActiveConversationId, styling } = useConvoStack();

  return (
    <>
      <div
        className={`w-full min-h-36 ${
          styling?.headerColor || "bg-blue-gradient"
        } sm:rounded-tl-lg sm:rounded-tr-lg sm:flex flex-wrap items-center py-4 hidden`}
      >
        <div
          className="left-0 absolute hover:cursor-pointer"
          onClick={() => setActiveConversationId(null)}
        >
          {icons?.backArrowIcon || <ArrowLeftIcon className="w-6 h-6 ml-4" />}
        </div>
        <div className="flex w-full">
          <p className="font-semibold mx-auto">
            {styling?.headerText || "ConvoStack Chat"}
          </p>
        </div>
      </div>
      <div
        className={`w-full min-h-36 ${
          styling?.headerColor || "bg-blue-gradient"
        } sm:rounded-tl-lg sm:rounded-tr-lg flex justify-between items-center py-4 sm:hidden`}
      >
        <div
          className="hover:cursor-pointer"
          onClick={() => setActiveConversationId(null)}
        >
          {icons?.backArrowIcon || <ArrowLeftIcon className="w-6 h-6 ml-4" />}
        </div>
        <p className="font-semibold mx-auto">
          {styling?.headerText || "ConvoStack Chat"}
        </p>
        <div className="hover:cursor-pointer" onClick={onClickClose}>
          <XIcon className="w-6 h-6 mr-4" />
        </div>
      </div>
    </>
  );
};

export default Header;
