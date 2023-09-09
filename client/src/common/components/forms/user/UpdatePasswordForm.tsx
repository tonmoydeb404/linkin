import { useUpdatePasswordMutation } from "@/api/userApi";
import { setFormError } from "@/utils/setFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HiCheck, HiX } from "react-icons/hi";
import { toast } from "react-toastify";
import * as z from "zod";
import LoadingButton from "../../button/LoadingButton";
import { Alert } from "../../ui/alert";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import FormPassword from "../FormPassword";

const formSchema = z
  .object({
    old_password: z.string({ required_error: "Old password is required!" }),
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
  .superRefine(({ confirm_password, new_password, old_password }, ctx) => {
    if (old_password === new_password) {
      ctx.addIssue({
        code: "custom",
        message: "Password should not match with old password!",
        path: ["new_password"],
      });
    }

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
  submitCallback?: () => any;
  cancelCallback?: () => any;
  className?: string;
};

const UpdatePasswordForm = ({
  className,
  cancelCallback = () => {},
  submitCallback = () => {},
}: Props) => {
  const [updatePassword] = useUpdatePasswordMutation();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "all",
  });
  const { handleSubmit, formState, clearErrors, setError, reset } = form;

  const onSubmit = async (values: FormSchema) => {
    try {
      await toast.promise(updatePassword(values).unwrap(), {
        error: "Error in updating password!",
        pending: "Updating password...",
        success: "Password updated",
      });
      clearErrors();
      reset();
      submitCallback();
    } catch (error: any) {
      setFormError(error?.data?.errors, setError, Object.keys(values));
    }
  };

  return (
    <Form {...form}>
      <form
        className={`flex flex-col gap-2 ${className}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        {formState.errors.root ? (
          <Alert variant="destructive" className="mb-3">
            {formState.errors.root.message}
          </Alert>
        ) : null}

        <FormPassword
          label="Old password"
          name="old_password"
          defaultValue=""
        />
        <FormPassword
          label="New password"
          name="new_password"
          defaultValue=""
        />
        <FormPassword
          label="Confirm password"
          name="confirm_password"
          defaultValue=""
        />

        <div className="flex items-center gap-2 mt-5">
          <LoadingButton
            size="sm"
            type="submit"
            disabled={formState.isSubmitting}
            isLoading={formState.isSubmitting}
          >
            Update <HiCheck className="ml-2" />
          </LoadingButton>
          <Button
            variant="destructive"
            size="sm"
            onClick={cancelCallback}
            type="reset"
          >
            Cancel <HiX className="ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdatePasswordForm;
