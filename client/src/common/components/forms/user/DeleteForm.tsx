import { useDeleteUserMutation } from "@/api/userApi";
import { useAppDispatch } from "@/app/hooks";
import { authSignout } from "@/features/auth/authSlice";
import { setFormError } from "@/utils/setFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HiTrash, HiX } from "react-icons/hi";
import { toast } from "react-toastify";
import * as z from "zod";
import LoadingButton from "../../button/LoadingButton";
import { Alert } from "../../ui/alert";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import FormCheckbox from "../FormCheckbox";
import FormPassword from "../FormPassword";

const formSchema = z.object({
  confirm: z.literal<boolean>(true, {
    required_error: "You have to confirm your delete account",
    invalid_type_error: "You have to confirm your delete account",
  }),
  password: z
    .string({ required_error: "Password is required!" })
    .nonempty("Password is required!"),
});
type FormSchema = z.infer<typeof formSchema>;

type Props = {
  submitCallback?: () => any;
  cancelCallback?: () => any;
  className?: string;
};

const DeleteForm = ({
  className,
  cancelCallback = () => {},
  submitCallback = () => {},
}: Props) => {
  const dispatch = useAppDispatch();

  const [deleteUser] = useDeleteUserMutation();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm: false,
    },
  });
  const { handleSubmit, formState, clearErrors, setError, reset } = form;

  const onSubmit = async (values: FormSchema) => {
    try {
      await toast.promise(deleteUser({ password: values.password }).unwrap(), {
        error: "Error in deleting account!",
        pending: "Deleting account...",
        success: "Account Deleted",
      });
      // update username in local auth state
      dispatch(authSignout());
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
        className={`flex flex-col gap-4 ${className}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        {formState.errors.root ? (
          <Alert variant="destructive" className="mb-3">
            {formState.errors.root.message}
          </Alert>
        ) : null}

        <FormPassword label="Password" name="password" />
        <FormCheckbox label="Confirm delete account" name="confirm" />

        <div className="flex items-center gap-2 mt-5">
          <LoadingButton
            size="sm"
            type="submit"
            disabled={!formState.isValid || formState.isSubmitting}
            isLoading={formState.isSubmitting}
          >
            Delete <HiTrash className="ml-2" />
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

export default DeleteForm;
