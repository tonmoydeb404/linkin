import { useLazyAuthVerifyEmailRequestQuery } from "@/api/authApi";
import LoadingButton from "@/common/components/button/LoadingButton";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/common/components/ui/alert";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { HiCheck, HiEmojiSad, HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";

type Props = {
  email: string;
};

const VerifyEmailRequest = ({ email }: Props) => {
  const [requestVerify, result] = useLazyAuthVerifyEmailRequestQuery();

  const handleRequest = async () => {
    await requestVerify();
  };

  if (result.isSuccess && result.data?.result?.mailSent) {
    return (
      <Alert>
        <HiCheck className="text-lg" />
        <AlertTitle>Email verification Mail sent</AlertTitle>
        <AlertDescription>
          check your mail inbox and spam box too.
        </AlertDescription>
      </Alert>
    );
  }

  if (result.isError || (result.isSuccess && !result.data?.result?.mailSent)) {
    return (
      <Alert variant={"destructive"}>
        <HiEmojiSad className="text-xl" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Could not send email verification link. please refresh page and try
          again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Input value={email} disabled />
      <LoadingButton
        onClick={handleRequest}
        isLoading={result.isLoading || result.isFetching}
        disabled={result.isLoading || result.isFetching}
        loadingText="Sending Mail..."
      >
        Send Verification Mail <HiMail className="ml-1 text-lg" />
      </LoadingButton>
      <Button asChild variant={"secondary"}>
        <Link to={"/logout"}>Signout</Link>
      </Button>
    </div>
  );
};

export default VerifyEmailRequest;
