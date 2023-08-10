import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { Button, ButtonProps } from "../ui/button";

type LoadingButtonProps = {
  isLoading: boolean;
  loadingText?: string;
  children: ReactNode;
} & ButtonProps;

const LoadingButton = ({
  isLoading,
  loadingText,
  children,
  ...rest
}: LoadingButtonProps) => {
  return (
    <Button {...rest}>
      {isLoading ? (
        <>
          {loadingText || "loading"} <Loader2 className="ml-2 animate-spin" />
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
