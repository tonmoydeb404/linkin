import { Button } from "@/common/components/ui/button";
import { Helmet } from "react-helmet-async";
import { HiArrowRight, HiViewGrid } from "react-icons/hi";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>LinkIn - The link that links them all</title>
      </Helmet>
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <img
          src="/images/LOGO-CIRCLE.png"
          alt="LinkIn"
          className="w-[100px] h-[100px] mb-8"
        />
        <h1 className="text-5xl font-bold mb-1">
          Link<span className="text-[#11AD50]">In</span>
        </h1>
        <p className="text-base mb-10">The link that links them all</p>

        <div className="flex items-center gap-2">
          <Button size={"lg"} asChild>
            <Link to={"/register"}>
              Join Now <HiArrowRight className="ml-1" />
            </Link>
          </Button>

          <Button size={"lg"} variant="outline" asChild>
            <Link to={"/dashboard"}>
              Dashboard
              <HiViewGrid className="ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
