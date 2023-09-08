import { HiUserAdd, HiX } from "react-icons/hi";

import { useCreateUserMutation } from "@/api/userApi";
import { setFormError } from "@/utils/setFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import LoadingButton from "../../button/LoadingButton";
import { Alert } from "../../ui/alert";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import FormInput from "../FormInput";
import FormPassword from "../FormPassword";
import FormSelect, { FormSelectItem } from "../FormSelect";

const formSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string().min(6, "too short!"),
  username: z.string().min(3, "too short!").max(50, "too long!"),
  role: z
    .enum(["ADMIN", "USER"], { invalid_type_error: "User role is invalid" })
    .optional(),
  verifiedStatus: z
    .enum(["NONE", "DEVELOPER", "CELEBRITY"], {
      invalid_type_error: "Invalid verification status",
    })
    .optional(),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
  submitCallback?: () => any;
  cancelCallback?: () => any;
  className?: string;
};

const UserCreateForm = ({
  cancelCallback = () => {},
  submitCallback = () => {},
  className = "",
}: Props) => {
  const [createUser] = useCreateUserMutation();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });
  const { handleSubmit, setError, clearErrors, formState } = form;

  const onSubmit = async (values: FormSchema) => {
    try {
      await toast.promise(createUser(values).unwrap(), {
        error: "Error in creating user account!",
        pending: "Creating user account...",
        success: "User account created.",
      });

      clearErrors();
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
          <Alert variant="destructive">{formState.errors.root.message}</Alert>
        ) : null}

        <FormInput name="username" label="Username" />
        <FormInput name="email" label="Email" type="email" />
        <FormPassword name="password" label="Password" />
        <FormSelect name="role" placeholder="Select user role">
          <FormSelectItem value="ADMIN">Admin</FormSelectItem>
          <FormSelectItem value="USER">User</FormSelectItem>
        </FormSelect>
        <FormSelect
          name="verifiedStatus"
          placeholder="Select user verification status"
        >
          <FormSelectItem value="NONE">None</FormSelectItem>
          <FormSelectItem value="DEVELOPER">Developer</FormSelectItem>
          <FormSelectItem value="CELEBRITY">Celebrity</FormSelectItem>
        </FormSelect>

        <div className="flex items-center gap-2 mt-5">
          <LoadingButton
            type="submit"
            disabled={formState.isSubmitting || !formState.isValid}
            isLoading={formState.isSubmitting}
          >
            Create
            <HiUserAdd className="ml-2" />
          </LoadingButton>
          <Button variant="secondary" type="reset" onClick={cancelCallback}>
            Cancel
            <HiX className="ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserCreateForm;
