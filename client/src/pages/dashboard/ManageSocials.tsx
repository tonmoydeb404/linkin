import { useState } from "react";

import DialogWrapper from "@/common/components/dialog/DialogWrapper";
import { Button } from "@/common/components/ui/button";
import { Helmet } from "react-helmet-async";
import { HiPlus } from "react-icons/hi";
import SocialCreateForm from "../../common/components/forms/social/SocialCreateForm";
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
          <Button variant="default" onClick={() => setShowModal(true)}>
            Add New
            <HiPlus className="ml-2" />
          </Button>
        </div>
        <SocialTable />

        <DialogWrapper
          open={showModal}
          onChange={setShowModal}
          title="Add Social Link"
        >
          <SocialCreateForm
            cancelCallback={() => setShowModal(false)}
            submitCallback={() => setShowModal(false)}
          />
        </DialogWrapper>
      </div>
    </>
  );
};

export default ManageSocials;
