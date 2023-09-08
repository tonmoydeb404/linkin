import { useUpdateUsernameMutation } from "@/api/userApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { authUpdate, selectAuth } from "@/features/auth/authSlice";
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
import FormInput from "../FormInput";
import FormPassword from "../FormPassword";

const formSchema = z.object({
  username: z
    .string({ required_error: "New username is required" })
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores."
    ),
  confirmPassword: z.string({ required_error: "Password is required!" }),
});
type FormSchema = z.infer<typeof formSchema>;

type Props = {
  submitCallback?: () => any;
  cancelCallback?: () => any;
  className?: string;
};

const UpdateUsernameForm = ({
  className,
  cancelCallback = () => {},
  submitCallback = () => {},
}: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  const [updateUsername] = useUpdateUsernameMutation();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmPassword: "",
      username: "",
    },
  });
  const { handleSubmit, formState, clearErrors, setError, reset } = form;

  const onSubmit = async (values: FormSchema) => {
    if (!user) return;
    try {
      const response = await toast.promise(
        updateUsername({ ...values, user_id: user.id }).unwrap(),
        {
          error: "Error in updating username!",
          pending: "Updating username...",
          success: "Username updated",
        }
      );
      // update username in local auth state
      dispatch(authUpdate({ username: response.result.username }));
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

        <FormInput label="New username" name="username" />
        <FormPassword label="Password" name="confirmPassword" />

        <div className="flex items-center gap-2 mt-5">
          <LoadingButton
            size="sm"
            type="submit"
            disabled={!formState.isValid || formState.isSubmitting}
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

export default UpdateUsernameForm;
