import { HiExternalLink } from "react-icons/hi";
import { ILink } from "../../../types/link.type";

type Props = { link: ILink };

const LinkCard = ({ link }: Props) => {
  return (
    <div className="flex items-center gap-3 bg-white shadow-sm border border-slate-300 dark:bg-gray-800 dark:border-gray-700 p-2 rounded-xl group">
      <div className="aspect-square relative w-[40px]">
        <img
          src={link.icon}
          alt={link.title}
          className="object-cover rounded-full aspect-square"
        />
      </div>
      <h3 className="text-lg font-medium">{link.title}</h3>
      <a
        href={link.url}
        target="_blank"
        className="inline-flex items-center justify-center w-[40px] h-[40px] bg-gray-800 text-gray-50 dark:bg-gray-900 rounded-lg ml-auto opacity-0 group-hover:opacity-100 duration-200"
      >
        <HiExternalLink className="text-2xl" />
      </a>
    </div>
  );
};

export default LinkCard;
