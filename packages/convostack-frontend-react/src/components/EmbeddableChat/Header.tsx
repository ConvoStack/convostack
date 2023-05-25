import { useContext } from "react";
import { CustomIconsContext } from "../../App";
import ArrowLeftIcon from "../../assets/ArrowLeftIcon";
import useConvoStack from "../../hooks/useConvoStack";
import { setEmbedIsConversationListVisible } from "../../redux/slice";
import { useDispatch } from "react-redux";
import { CustomEmbedStyling } from "../../types/CustomStyling";

interface HeaderProps {
  id: string;
  customStyling?: CustomEmbedStyling;
}

const Header: React.FC<HeaderProps> = ({ id, customStyling }) => {
  const icons = useContext(CustomIconsContext);
  const dispatch = useDispatch();
  const { styling, setActiveConversationId } = useConvoStack();
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
              setEmbedIsConversationListVisible({ key: id, value: true })
            );
            setActiveConversationId(null, undefined, id);
          }}
        >
          {icons?.backArrowIcon || (
            <ArrowLeftIcon
              className="w-6 h-6 ml-4"
              color={customStyling?.iconsColor}
            />
          )}
        </div>
        <div className="flex mx-auto">
          <p
            className={`font-semibold mx-auto ${
              styling?.headerTextColor || ""
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
