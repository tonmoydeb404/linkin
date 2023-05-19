import { Avatar, Button, Table } from "react-daisyui";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { ILink } from "../../../../types/link.type";

type Props = {
  link: ILink;
  onDelete: () => Promise<any> | any;
  onUpdate: () => Promise<any> | any;
};

const LinkRow = ({ link, onDelete, onUpdate }: Props) => {
  return (
    <Table.Row>
      <span>#</span>
      {link.icon ? (
        <Avatar shape="circle" size={"xs"} src={link.icon} />
      ) : (
        <span></span>
      )}
      <span>{link.title}</span>
      <span>{link.slug}</span>
      <span>{link.url}</span>
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
