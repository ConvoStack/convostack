import { useContext } from "react";
import { CustomIconsContext } from "../../App";
import ArrowLeftIcon from "../../assets/ArrowLeftIcon";
import useConvoStack from "../../hooks/useConvoStack";

interface HeaderProps {
  id: string;
}

const Header: React.FC<HeaderProps> = ({ id }) => {
  const icons = useContext(CustomIconsContext);
  const { styling, setActiveConversationId } = useConvoStack();
  return (
    <div className="relative w-full">
      <div
        className={`w-full min-h-36 ${
          styling?.headerColor || "bg-blue-gradient"
        } flex flex-wrap items-center py-4`}
      >
        <div
          className="left-0 absolute hover:cursor-pointer"
          onClick={() => setActiveConversationId(null, undefined, id)}
        >
          {icons?.backArrowIcon || <ArrowLeftIcon className="w-6 h-6 ml-4" />}
        </div>
        <div className="flex w-full">
          <p className="font-semibold mx-auto">
            {styling?.headerText || "Convo Stack Chat"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
