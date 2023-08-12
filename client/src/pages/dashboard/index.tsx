import { Helmet } from "react-helmet-async";
import Construction from "../../common/components/errors/Construction";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard - LinkIn</title>
      </Helmet>
      <Construction />
    </>
  );
};

export default Dashboard;
