import { ReactElement } from "react";
import { Button, Modal } from "react-daisyui";
import { HiX } from "react-icons/hi";

type Props = {
  show: boolean;
  hide(): any;
  title: string;
  children: ReactElement;
};

const ModalWrapper = ({ hide, show, title, children }: Props) => {
  return (
    <Modal open={show} onClickBackdrop={hide}>
      <Modal.Header className="flex items-center justify-between">
        <h4 className="font-bold">{title}</h4>

        <Button
          color="ghost"
          variant="outline"
          shape="square"
          size="sm"
          onClick={hide}
        >
          <HiX />
        </Button>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalWrapper;
