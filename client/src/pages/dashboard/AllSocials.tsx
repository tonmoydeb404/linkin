import SocialAdminTable from "@/common/components/tables/social/SocialAdminTable";
import { Helmet } from "react-helmet-async";

const AllSocials = () => {
  return (
    <>
      <Helmet>
        <title>Manage All Socials - LinkIn</title>
      </Helmet>

      <div className="flex justify-between mb-10 items-center">
        <h2 className="text-xl font-semibold">All Socials</h2>
      </div>
      <SocialAdminTable />
    </>
  );
};

export default AllSocials;
