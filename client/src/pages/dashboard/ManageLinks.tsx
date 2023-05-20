import { useState } from "react";
import { Button } from "react-daisyui";
import { Helmet } from "react-helmet";
import { HiPlus } from "react-icons/hi";
import LinkCreateForm from "../../common/components/forms/link/LinkCreateForm";
import ModalWrapper from "../../common/components/modals/ModalWrapper";
import LinkTable from "../../common/components/tables/link/LinkTable";

const ManageLinks = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Helmet>
        <title>Manage Links - LinkIn</title>
      </Helmet>
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
        <LinkTable />

        <ModalWrapper
          show={showModal}
          hide={() => setShowModal(false)}
          title="Add External Link"
        >
          <LinkCreateForm
            onCancel={() => setShowModal(false)}
            onSubmit={() => setShowModal(false)}
          />
        </ModalWrapper>
      </div>
    </>
  );
};

export default ManageLinks;
