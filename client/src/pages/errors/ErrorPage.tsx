import { Button } from "@/common/components/ui/button";
import { Helmet } from "react-helmet-async";
import { LuArrowRight, LuXOctagon } from "react-icons/lu";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>Error - LinkIN</title>
      </Helmet>
      <div className="w-full flex flex-col py-24 text-center items-center justify-center">
        <LuXOctagon className="text-7xl text-destructive mb-5" />
        <h2 className="text-3xl font-bold mb-2">Something Wents to Wrong</h2>
        <p className="mb-10">
          there is some error happend. we are trying to fix it!
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

export default ErrorPage;
