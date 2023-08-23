import { setFormError } from "@/utils/setFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HiArrowRight, HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as z from "zod";
import { useAuthPasswordResetRequestMutation } from "../../../../api/authApi";
import LoadingButton from "../../button/LoadingButton";
import { Alert } from "../../ui/alert";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import FormInput from "../FormInput";

const formSchema = z.object({
  email: z.string().email("invalid email"),
});
type FormSchema = z.infer<typeof formSchema>;

type Props = {
  className?: string;
};

const ResetPasswordRequestForm = ({ className = "" }: Props) => {
  const [resetRequest, result] = useAuthPasswordResetRequestMutation();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const { handleSubmit, setError, clearErrors, formState, reset } = form;

  const onSubmit = async (values: FormSchema) => {
    try {
      await toast.promise(resetRequest(values).unwrap(), {
        error: "Error in request for reset password",
        pending: "Requesting for reset password...",
        success: "Reset password link sent to your email.",
      });
      clearErrors();
      reset();
    } catch (error: any) {
      setFormError(error?.data?.errors, setError, Object.keys(values));
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col gap-2 ${className}`}
      >
        {result.isSuccess ? (
          <Alert variant={"default"}>
            Check your email inbox for reset link. also check the spam box too.
          </Alert>
        ) : null}

        {formState.errors.root ? (
          <Alert variant="destructive">{formState.errors.root.message}</Alert>
        ) : null}
        <FormInput name="email" label="Email" placeholder="your@mail.com" />

        <div className="flex items-center gap-2 mt-5">
          <LoadingButton
            type="submit"
            disabled={formState.isSubmitting || !formState.isValid}
            isLoading={formState.isSubmitting}
          >
            Send Reset Link <HiMail className="ml-2" />
          </LoadingButton>
          <Button variant="secondary" size="sm" asChild>
            <Link to="/login">
              Back to login <HiArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordRequestForm;
