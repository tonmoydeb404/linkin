import { Button } from "@/common/components/ui/button";
import { Helmet } from "react-helmet-async";
import { LuArrowRight } from "react-icons/lu";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Not Found - LinkIN</title>
      </Helmet>
      <div className="w-full flex flex-col py-24 text-center items-center justify-center">
        <h3 className="text-7xl text-destructive mb-5">404</h3>
        <h2 className="text-3xl font-bold mb-2">
          Requested resource not found
        </h2>
        <p className="mb-10">
          the resource you have requested, is currently not available. please
          try again later.
        </p>

        <Button asChild>
          <Link to={"/"}>
            Back To Home <LuArrowRight className="ml-1" />{" "}
          </Link>
        </Button>
      </div>
    </>
  );
};

export default NotFound;
