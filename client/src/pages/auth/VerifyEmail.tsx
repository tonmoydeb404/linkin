import { useAppSelector } from "@/app/hooks";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/common/components/ui/alert";
import { Button } from "@/common/components/ui/button";
import VerifyEmailRequest from "@/common/sections/auth/VerifyEmail/VerifyEmailRequest";
import VerifyEmailResponse from "@/common/sections/auth/VerifyEmail/VerifyEmailResponse";
import { selectAuth } from "@/features/auth/authSlice";
import { Helmet } from "react-helmet-async";
import { HiShieldCheck, HiViewGrid } from "react-icons/hi";
import { Link, useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const { user } = useAppSelector(selectAuth);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Verify Email - LinkIn</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-screen py-10 px-5">
        {user?.emailVerified ? (
          <div className="max-w-lg w-full flex flex-col items-start">
            <Alert className="mb-2">
              <HiShieldCheck className="text-xl" />
              <AlertTitle>Congratulations</AlertTitle>
              <AlertDescription>Your email is verfied</AlertDescription>
            </Alert>
            <Button asChild className="self-end">
              <Link to={"/dashboard"}>Back to dashboard</Link>
            </Button>
          </div>
        ) : (
          <div className="max-w-lg w-full flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Verify Email</h2>
              <Link to={"/dashboard"}>
                <HiViewGrid className="text-2xl" />
              </Link>
            </div>
            <p className="mb-5 text-muted-foreground text-sm">
              by verifing email it could easier to reach you and provide better
              services.
            </p>

            {token ? (
              <VerifyEmailResponse token={token} email={user.email} />
            ) : (
              <VerifyEmailRequest email={user.email} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default VerifyEmail;
