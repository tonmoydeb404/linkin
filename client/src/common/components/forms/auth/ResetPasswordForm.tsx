import { setFormError } from "@/utils/setFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HiArrowRight, HiRefresh } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as z from "zod";
import { useAuthPasswordResetMutation } from "../../../../api/authApi";
import LoadingButton from "../../button/LoadingButton";
import { Alert, AlertDescription } from "../../ui/alert";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import FormInput from "../FormInput";

const formSchema = z
  .object({
    new_password: z
      .string({ required_error: "New password is required!" })
      .min(6, "Password should be at least 6 chars long")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:',<.>/?[\]\\|]).*$/,
        "Password should contain at least 1 lowercase, 1 uppercase, 1 number & 1 special symbol."
      ),
    confirm_password: z.string({
      required_error: "Confirm password is required!",
    }),
  })
  .superRefine(({ confirm_password, new_password }, ctx) => {
    if (confirm_password !== new_password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords doesn't match!",
        path: ["confirm_password"],
      });
    }
  });

type FormSchema = z.infer<typeof formSchema>;

type Props = {
  className?: string;
  token: string;
};

const ResetPasswordForm = ({ className = "", token }: Props) => {
  const [resetPassword, response] = useAuthPasswordResetMutation();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });
  const { handleSubmit, setError, clearErrors, formState, reset } = form;

  const onSubmit = async (values: FormSchema) => {
    try {
      await toast.promise(
        resetPassword({ password: values.new_password, token }).unwrap(),
        {
          error: "Error in reset password",
          pending: "Reseting password...",
          success: "Password reseted",
        }
      );
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
        {formState.errors.root ? (
          <Alert variant="destructive">
            <AlertDescription>{formState.errors.root.message}</AlertDescription>
          </Alert>
        ) : null}

        {response.isSuccess ? (
          <Alert>
            <AlertDescription>
              Password reset complete. back to{" "}
              <Link className="text-primary" to={"/login"}>
                login
              </Link>
            </AlertDescription>
          </Alert>
        ) : null}

        <FormInput name="new_password" label="New password" />
        <FormInput name="confirm_password" label="Confirm password" />

        <div className="flex items-center gap-2 mt-5">
          <LoadingButton
            type="submit"
            disabled={formState.isSubmitting}
            isLoading={formState.isSubmitting}
          >
            Reset Password <HiRefresh className="ml-2" />
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

export default ResetPasswordForm;
