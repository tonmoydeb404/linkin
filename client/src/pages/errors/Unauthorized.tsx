import { Button } from "@/common/components/ui/button";
import { Helmet } from "react-helmet-async";
import { LuArrowRight, LuBan } from "react-icons/lu";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <>
      <Helmet>
        <title>Unauthorized access denied - LinkIN</title>
      </Helmet>
      <div className="w-full flex flex-col py-24 text-center items-center justify-center">
        <LuBan className="text-7xl text-destructive mb-5" />
        <h2 className="text-3xl font-bold mb-2">Unauthorized access denied</h2>
        <p className="mb-10">
          you have to login with you account to access this
        </p>

        <Button asChild>
          <Link to={"/"}>
            Back To Home <LuArrowRight className="ml-1" />
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Unauthorized;
