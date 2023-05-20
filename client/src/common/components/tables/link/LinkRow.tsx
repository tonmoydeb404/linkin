import { Avatar, Button, Table } from "react-daisyui";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import { ILink } from "../../../../types/link.type";

type Props = {
  link: ILink;
  onDelete: () => Promise<any> | any;
  onUpdate: () => Promise<any> | any;
};

const LinkRow = ({ link, onDelete, onUpdate }: Props) => {
  return (
    <Table.Row>
      {link.icon ? (
        <Avatar shape="circle" size={"xs"} src={link.icon} />
      ) : (
        <span></span>
      )}
      <span>{link.title}</span>
      <Link target="_blank" to={`/l/${link.slug}`} className="link link-hover">
        {link.slug}
      </Link>
      <Link target="_blank" to={`${link.url}`} className="link link-hover">
        {link.url}
      </Link>
      <span>{link.clicks}</span>
      <div className="flex items-center gap-1">
        <Button size="sm" shape="square" color="warning" onClick={onUpdate}>
          <HiPencilAlt />
        </Button>
        <Button size="sm" shape="square" color="error" onClick={onDelete}>
          <HiTrash />
        </Button>
      </div>
    </Table.Row>
  );
};

export default LinkRow;
