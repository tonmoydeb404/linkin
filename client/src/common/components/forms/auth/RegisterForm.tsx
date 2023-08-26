import { HiLogin, HiUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";

import { useAuthRegisterMutation } from "../../../../api/authApi";
import { useAppDispatch } from "../../../../app/hooks";
import { logInKey } from "../../../../config/localstorage";
import { authSignin, authSignout } from "../../../../features/auth/authSlice";

import { setFormError } from "@/utils/setFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import LoadingButton from "../../button/LoadingButton";
import { Alert } from "../../ui/alert";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import FormInput from "../FormInput";

const registerSchema = z.object({
  firstName: z.string().min(2, "too short!").max(50, "too long"),
  lastName: z.string().min(2, "too short!").max(50, "too long"),
  email: z.string().email("invalid email"),
  password: z.string().min(6, "too short!"),
  username: z.string().min(3, "too short!").max(50, "too long!"),
});

type RegisterSchema = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [authRegister] = useAuthRegisterMutation();
  const dispatch = useAppDispatch();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      username: "",
    },
  });
  const { handleSubmit, setError, clearErrors, formState } = form;

  const onSubmit = async (values: RegisterSchema) => {
    try {
      const data = await authRegister(values).unwrap();
      dispatch(authSignin(data.result.payload));
      localStorage.setItem(logInKey, "true");
      clearErrors();
    } catch (error: any) {
      setFormError(error?.data?.errors, setError, Object.keys(values));
      // console.log(error);
      dispatch(authSignout());
      localStorage.setItem(logInKey, "false");
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        {formState.errors.root ? (
          <Alert variant="destructive">{formState.errors.root.message}</Alert>
        ) : null}

        <FormInput name="firstName" label="First Name" />
        <FormInput name="lastName" label="Last Name" />
        <FormInput name="username" label="Username" />
        <FormInput name="email" label="Email" type="email" />
        <FormInput name="password" label="Password" type="password" />

        <div className="flex items-center gap-2 mt-5">
          <LoadingButton
            type="submit"
            disabled={formState.isSubmitting || !formState.isValid}
            isLoading={formState.isSubmitting}
          >
            Register
            <HiUserAdd className="ml-2" />
          </LoadingButton>
          <Button asChild variant="secondary" type="reset">
            <Link to={"/login"}>
              Login
              <HiLogin className="ml-2" />
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
