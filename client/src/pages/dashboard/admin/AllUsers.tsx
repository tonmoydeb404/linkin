import DialogWrapper from "@/common/components/dialog/DialogWrapper";
import UserCreateForm from "@/common/components/forms/user/UserCreateForm";
import UserAdminTable from "@/common/components/tables/user/UserAdminTable";
import { Button } from "@/common/components/ui/button";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { HiPlus } from "react-icons/hi";

const AllUsers = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Helmet>
        <title>Manage All Users - LinkIn</title>
      </Helmet>

      <div className="flex justify-between mb-10 items-center">
        <h2 className="text-xl font-semibold">Manage Users</h2>
        <Button variant="default" onClick={() => setShowModal(true)}>
          Add New
          <HiPlus className="ml-2" />
        </Button>
      </div>
      <UserAdminTable />
      <DialogWrapper
        open={showModal}
        onChange={setShowModal}
        title="Add New User"
      >
        <UserCreateForm
          cancelCallback={() => setShowModal(false)}
          submitCallback={() => setShowModal(false)}
        />
      </DialogWrapper>
    </>
  );
};

export default AllUsers;
