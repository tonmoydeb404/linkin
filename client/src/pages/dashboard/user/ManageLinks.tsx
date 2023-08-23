import DialogWrapper from "@/common/components/dialog/DialogWrapper";
import LinkCreateForm from "@/common/components/forms/link/LinkCreateForm";
import LinkUserTable from "@/common/components/tables/link/LinkUserTable";
import { Button } from "@/common/components/ui/button";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { HiPlus } from "react-icons/hi";

const ManageLinks = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Helmet>
        <title>Manage Links - LinkIn</title>
      </Helmet>

      <div className="flex justify-between mb-10 items-center">
        <h2 className="text-xl font-semibold">Manage Links</h2>
        <Button variant="default" onClick={() => setShowModal(true)}>
          Add New
          <HiPlus className="ml-2" />
        </Button>
      </div>
      <LinkUserTable />

      <DialogWrapper
        open={showModal}
        onChange={setShowModal}
        title="Create Link"
      >
        <LinkCreateForm
          submitCallback={() => setShowModal(false)}
          cancelCallback={() => setShowModal(false)}
        />
      </DialogWrapper>
    </>
  );
};

export default ManageLinks;
