import { Button } from "@/common/components/ui/button";
import { Helmet } from "react-helmet-async";
import { LuArrowRight, LuBan } from "react-icons/lu";
import { Link } from "react-router-dom";

const Banned = () => {
  return (
    <>
      <Helmet>
        <title>Content Banned - LinkIN</title>
      </Helmet>
      <div className="w-full flex flex-col py-24 text-center items-center justify-center">
        <LuBan className="text-7xl text-destructive mb-5" />
        <h2 className="text-3xl font-bold mb-2">Content is Banned</h2>
        <p className="mb-10">
          for some reason your requested content is banned. at this time you
          can't access this
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

export default Banned;
