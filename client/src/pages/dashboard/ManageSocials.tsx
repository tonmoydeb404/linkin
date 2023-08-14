import { useState } from "react";

import DialogWrapper from "@/common/components/dialog/DialogWrapper";
import { Button } from "@/common/components/ui/button";
import { Helmet } from "react-helmet-async";
import { HiPlus } from "react-icons/hi";
import SocialCreateForm from "../../common/components/forms/social/SocialCreateForm";
import SocialUserTable from "../../common/components/tables/social/SocialUserTable";

const ManageSocials = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Helmet>
        <title>Manage Socials - LinkIn</title>
      </Helmet>

      <div className="flex justify-between mb-10 items-center">
        <h2 className="text-xl font-semibold">Manage Socials</h2>
        <Button variant="default" onClick={() => setShowModal(true)}>
          Add New
          <HiPlus className="ml-2" />
        </Button>
      </div>
      <SocialUserTable />

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
    </>
  );
};

export default ManageSocials;
