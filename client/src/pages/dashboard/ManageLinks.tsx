import { useState } from "react";
import { Avatar, Button, Input, Modal, Table } from "react-daisyui";
import { HiPencilAlt, HiPlus, HiTrash, HiX } from "react-icons/hi";
import { useUserLinksQuery } from "../../api/linksApi";

const ManageLinks = () => {
  const [showModal, setShowModal] = useState(false);
  const { data, isSuccess } = useUserLinksQuery(undefined);
  return (
    <div className="px-8 py-10">
      <div className="flex justify-between mb-10 items-center">
        <h2 className="text-xl font-semibold">Manage Links</h2>
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
          <span>Icon</span>
          <span>Title</span>
          <span>Slug</span>
          <span>URL</span>
          <span>Clicks</span>
          <span>Manage</span>
        </Table.Head>

        <Table.Body>
          {isSuccess
            ? data.results.map((link, index) => (
                <Table.Row key={link.id}>
                  <span>{index}</span>
                  <Avatar
                    shape="circle"
                    size={"xs"}
                    src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                  />
                  <span>{link.title}</span>
                  <span>{link.slug}</span>
                  <span>{link.url}</span>
                  <span>{link.clicks}</span>
                  <div className="flex items-center gap-1">
                    <Button size="sm" shape="square" color="warning">
                      <HiPencilAlt />
                    </Button>
                    <Button size="sm" shape="square" color="error">
                      <HiTrash />
                    </Button>
                  </div>
                </Table.Row>
              ))
            : null}
        </Table.Body>
      </Table>

      <Modal open={showModal} onClickBackdrop={() => setShowModal(false)}>
        <Modal.Header className="flex items-center justify-between">
          <h4 className="font-bold">Add External Link</h4>

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
            <label htmlFor="url" className="label">
              <span className="label-text">URL</span>
            </label>
            <Input
              name="url"
              id="url"
              placeholder="https://facebook.com/linkin"
            />
          </div>
          <div className="form-control w-full">
            <label htmlFor="slug" className="label">
              <span className="label-text">Slug</span>
              <span className="label-text-alt opacity-60">optional</span>
            </label>
            <Input name="slug" id="slug" placeholder="Alias for your link" />
          </div>
          <div className="form-control w-full">
            <label htmlFor="slug" className="label">
              <span className="label-text">Icon</span>
              <span className="label-text-alt opacity-60">optional</span>
            </label>
            <Input
              name="slug"
              id="slug"
              placeholder="https://example.com/image.png"
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

export default ManageLinks;
