import { HiLogin, HiUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
import * as z from "zod";
import { useAuthLoginMutation } from "../../../../api/authApi";
import { useAppDispatch } from "../../../../app/hooks";
import { logInKey } from "../../../../config/localstorage";
import { authLoading, authSignin } from "../../../../features/auth/authSlice";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Alert } from "../../ui/alert";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

const loginSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string(),
});

const LoginForm = () => {
  const [authLogin] = useAuthLoginMutation();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { control, handleSubmit, setError, clearErrors, formState } = form;

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      dispatch(authLoading());
      const data = await authLogin(values).unwrap();
      dispatch(authSignin(data.payload));
      localStorage.setItem(logInKey, "true");
      clearErrors();
    } catch (error: any) {
      if (error?.data?.errors) {
        Object.keys(error.data.errors).forEach((er) => {
          if (er === "email" || er === "password") {
            setError(er, { message: error.data.errors[er] });
          } else {
            setError("root", { message: error.data.errors[er] });
          }
        });
      }
      console.log(error);
      localStorage.setItem(logInKey, "false");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {formState.errors.root ? (
          <Alert variant="destructive">{formState.errors.root.message}</Alert>
        ) : null}
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2 mt-5">
          <Button
            variant="default"
            type="submit"
            disabled={formState.isSubmitting || !formState.isValid}
          >
            {formState.isSubmitting ? (
              <>
                Signing in... <Loader2 className="ml-2 animate-spin" />
              </>
            ) : (
              <>
                Login <HiLogin className="ml-2" />
              </>
            )}
          </Button>
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
