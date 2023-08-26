import { useAuthVerifyEmailMutation } from "@/api/authApi";
import { useAppDispatch } from "@/app/hooks";
import LoadingButton from "@/common/components/button/LoadingButton";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/common/components/ui/alert";
import { Input } from "@/common/components/ui/input";
import { authUpdate } from "@/features/auth/authSlice";
import { HiCheck, HiEmojiSad } from "react-icons/hi";
import { Link } from "react-router-dom";

type Props = {
  token: string;
  email: string;
};

const VerifyEmailResponse = ({ token, email }: Props) => {
  const [verifyEmail, result] = useAuthVerifyEmailMutation();
  const dispatch = useAppDispatch();

  const handleVerify = async () => {
    try {
      const response = await verifyEmail({ token }).unwrap();
      dispatch(authUpdate({ emailVerified: response.result.emailVerified }));
    } catch (error) {
      console.log(error);
    }
  };

  if (result.isSuccess) {
    return (
      <Alert>
        <HiCheck className="text-lg" />
        <AlertTitle>Email Verified</AlertTitle>
        <AlertDescription>
          your email is verified. back to&nbsp;
          <Link to="/dashboard" className="text-primary">
            Dashboard
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  if (result.isError) {
    return (
      <Alert variant={"destructive"}>
        <HiEmojiSad className="text-xl" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Could not verify your email. please refresh page and try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Input value={email} disabled />
      <LoadingButton
        onClick={handleVerify}
        loadingText="Verifing"
        isLoading={result.isLoading}
        disabled={result.isLoading}
      >
        Verify Email
      </LoadingButton>
    </div>
  );
};

export default VerifyEmailResponse;
