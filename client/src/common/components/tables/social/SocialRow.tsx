import { Button, Table } from "react-daisyui";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { ISocial } from "../../../../types/social.type";

type Props = {
  social: ISocial;
  onDelete: () => Promise<any> | any;
  onUpdate: () => Promise<any> | any;
};

const SocialRow = ({ social, onDelete, onUpdate }: Props) => {
  return (
    <Table.Row>
      <span>{social.site}</span>
      <span>{social.url}</span>
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

export default SocialRow;
