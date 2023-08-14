import LinkAdminTable from "@/common/components/tables/link/LinkAdminTable";
import { Helmet } from "react-helmet-async";

const AllLinks = () => {
  return (
    <>
      <Helmet>
        <title>Manage All Links - LinkIn</title>
      </Helmet>

      <div className="flex justify-between mb-10 items-center">
        <h2 className="text-xl font-semibold">Manage Links</h2>
      </div>
      <LinkAdminTable />
    </>
  );
};

export default AllLinks;
