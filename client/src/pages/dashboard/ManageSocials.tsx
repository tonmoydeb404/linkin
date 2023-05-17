import { useState } from "react";
import { Button, Input, Modal, Select, Table } from "react-daisyui";
import { HiPencilAlt, HiPlus, HiTrash, HiX } from "react-icons/hi";

const ManageSocials = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="px-8 py-10">
      <div className="flex justify-between mb-10 items-center">
        <h2 className="text-xl font-semibold">Manage Socials</h2>
        <Button
          color="success"
          endIcon={<HiPlus />}
          onClick={() => setShowModal(true)}
        >
          Add New
        </Button>
      </div>
      <Table className="w-full">
        <Table.Head>
          <span />
          <span>Title</span>
          <span>Site</span>
          <span>URL</span>
          <span>Manage</span>
        </Table.Head>

        <Table.Body>
          <Table.Row>
            <span>1</span>
            <span>Cy Ganderton</span>
            <span>Quality Control Specialist</span>
            <span>Blue</span>
            <div className="flex items-center gap-1">
              <Button size="sm" shape="square" color="warning">
                <HiPencilAlt />
              </Button>
              <Button size="sm" shape="square" color="error">
                <HiTrash />
              </Button>
            </div>
          </Table.Row>
        </Table.Body>
      </Table>

      <Modal open={showModal} onClickBackdrop={() => setShowModal(false)}>
        <Modal.Header className="flex items-center justify-between">
          <h4 className="font-bold">Add Social Link</h4>

          <Button
            color="ghost"
            variant="outline"
            shape="square"
            size="sm"
            onClick={() => setShowModal(false)}
          >
            <HiX />
          </Button>
        </Modal.Header>

        <Modal.Body className="flex flex-col gap-2">
          <div className="form-control w-full">
            <label htmlFor="title" className="label">
              <span className="label-text">Title</span>
            </label>
            <Input name="title" id="title" placeholder="Link Title" />
          </div>
          <div className="form-control w-full">
            <label htmlFor="site" className="label">
              <span className="label-text">Website</span>
            </label>
            <Select name="site" id="site">
              <Select.Option>Facebook</Select.Option>
              <Select.Option>Whatsapp</Select.Option>
            </Select>
          </div>
          <div className="form-control w-full">
            <label htmlFor="url" className="label">
              <span className="label-text">URL</span>
            </label>
            <Input
              name="url"
              id="url"
              placeholder="https://facebook.com/linkin"
            />
          </div>
          <div className="flex items-center gap-2 mt-5">
            <Button endIcon={<HiPlus />} color="success" size="sm">
              Add
            </Button>
            <Button endIcon={<HiX />} color="error" size="sm">
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageSocials;
