import { HiExternalLink } from "react-icons/hi";
import { ILink } from "../../../types/link.type";

type Props = { link: ILink };

const LinkCard = ({ link }: Props) => {
  return (
    <div className="link_card group">
      <img
        src={link.icon}
        alt={link.title}
        width={"40px"}
        height={"40px"}
        className="link_card_icon"
      />

      <h3 className="link_card_title">{link.title}</h3>
      <a href={link.url} target="_blank" className="link_card_url">
        <HiExternalLink className="text-2xl" />
      </a>
    </div>
  );
};

export default LinkCard;
