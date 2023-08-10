import { HiLogin, HiUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
import * as z from "zod";
import { useAuthLoginMutation } from "../../../../api/authApi";
import { useAppDispatch } from "../../../../app/hooks";
import { logInKey } from "../../../../config/localstorage";
import { authLoading, authSignin } from "../../../../features/auth/authSlice";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LoadingButton from "../../button/LoadingButton";
import { Alert } from "../../ui/alert";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import FormInput from "../FormInput";

const loginSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string(),
});

type LoginSchema = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [authLogin] = useAuthLoginMutation();
  const dispatch = useAppDispatch();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit, setError, clearErrors, formState } = form;

  const onSubmit = async (values: LoginSchema) => {
    try {
      dispatch(authLoading());
      const data = await authLogin(values).unwrap();
      dispatch(authSignin(data.payload));
      localStorage.setItem(logInKey, "true");
      clearErrors();
    } catch (error: any) {
      const fields = Object.keys(values);
      if (error?.data?.errors) {
        Object.keys(error.data.errors).forEach((er) => {
          if (fields.includes(er)) {
            setError(er as keyof LoginSchema, {
              message: error.data.errors[er],
            });
          } else {
            setError("root", { message: error.data.errors[er] });
          }
        });
      }
      localStorage.setItem(logInKey, "false");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {formState.errors.root ? (
          <Alert variant="destructive">{formState.errors.root.message}</Alert>
        ) : null}
        <FormInput name="email" label="Email" placeholder="your@mail.com" />
        <FormInput
          name="password"
          label="Password"
          placeholder="**********"
          type="password"
        />

        <div className="flex items-center gap-2 mt-5">
          <LoadingButton
            type="submit"
            disabled={formState.isSubmitting || !formState.isValid}
            isLoading={formState.isSubmitting}
          >
            Login <HiLogin className="ml-2" />
          </LoadingButton>
          <Button asChild variant="secondary" type="button">
            <Link to={"/register"}>
              Register <HiUserAdd className="ml-2" />
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
