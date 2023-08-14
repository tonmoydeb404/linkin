import UserAdminTable from "@/common/components/tables/user/UserAdminTable";
import { Button } from "@/common/components/ui/button";
import { Helmet } from "react-helmet-async";
import { HiPlus } from "react-icons/hi";

const AllUsers = () => {
  return (
    <>
      <Helmet>
        <title>Manage All Users - LinkIn</title>
      </Helmet>

      <div className="flex justify-between mb-10 items-center">
        <h2 className="text-xl font-semibold">Manage Users</h2>
        <Button variant="default" disabled>
          Add New
          <HiPlus className="ml-2" />
        </Button>
      </div>
      <UserAdminTable />
    </>
  );
};

export default AllUsers;
