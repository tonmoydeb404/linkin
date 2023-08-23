import ResetPasswordForm from "@/common/components/forms/auth/ResetPasswordForm";
import ResetPasswordRequestForm from "@/common/components/forms/auth/ResetPasswordRequestForm";
import { Helmet } from "react-helmet-async";
import { HiOutlineHome } from "react-icons/hi";
import { Link, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");

  return (
    <>
      <Helmet>
        <title>Reset Password - LinkIn</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-screen py-10 px-5">
        <div className="max-w-lg w-full flex flex-col gap-3">
          <div className="flex items-center mb-5 justify-between">
            <h2 className="text-2xl font-semibold">Reset Password</h2>
            <Link to={"/"}>
              <HiOutlineHome className="text-2xl" />
            </Link>
          </div>

          {token ? (
            <ResetPasswordForm token={token} />
          ) : (
            <ResetPasswordRequestForm />
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
