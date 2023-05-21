import { useState } from "react";
import { Button } from "react-daisyui";
import { Helmet } from "react-helmet";
import { HiPlus } from "react-icons/hi";
import SocialCreateForm from "../../common/components/forms/social/SocialCreateForm";
import ModalWrapper from "../../common/components/modals/ModalWrapper";
import SocialTable from "../../common/components/tables/social/SocialTable";

const ManageSocials = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Helmet>
        <title>Manage Socials - LinkIn</title>
      </Helmet>
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
        <SocialTable />

        <ModalWrapper
          show={showModal}
          hide={() => setShowModal(false)}
          title="Add External Link"
        >
          <SocialCreateForm
            onCancel={() => setShowModal(false)}
            onSubmit={() => setShowModal(false)}
            className="flex flex-col gap-2"
          />
        </ModalWrapper>
      </div>
    </>
  );
};

export default ManageSocials;
