import { HiLogin, HiUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";

import { useAuthRegisterMutation } from "../../../../api/authApi";
import { useAppDispatch } from "../../../../app/hooks";
import { logInKey } from "../../../../config/localstorage";
import {
  authLoading,
  authSignin,
  authSignout,
} from "../../../../features/auth/authSlice";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
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

const registerSchema = z.object({
  firstName: z.string().min(2, "too short!").max(50, "too long"),
  lastName: z.string().min(2, "too short!").max(50, "too long"),
  email: z.string().email("invalid email"),
  password: z.string().min(6, "too short!"),
  username: z.string().min(3, "too short!").max(50, "too long!"),
});

const RegisterForm = () => {
  const [authRegister] = useAuthRegisterMutation();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      username: "",
    },
  });
  const { control, handleSubmit, setError, clearErrors, formState } = form;

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      dispatch(authLoading());
      const data = await authRegister(values).unwrap();
      dispatch(authSignin(data.payload));
      localStorage.setItem(logInKey, "true");
      clearErrors();
    } catch (error: any) {
      if (error?.data?.errors) {
        Object.keys(error.data.errors).forEach((er) => {
          const prop: (keyof z.infer<typeof registerSchema>)[] = [
            "firstName",
            "lastName",
            "email",
            "password",
            "username",
          ];
          if (prop.includes(er as keyof z.infer<typeof registerSchema>)) {
            setError(er as keyof z.infer<typeof registerSchema>, {
              message: error.data.errors[er],
            });
          } else {
            setError("root", { message: error.data.errors[er] });
          }
        });
      }
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

        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
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
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2 mt-5">
          <Button
            type="submit"
            disabled={formState.isSubmitting || !formState.isValid}
          >
            {formState.isSubmitting ? (
              <>
                Loading... <Loader2 className="ml-2 animate-spin" />
              </>
            ) : (
              <>
                Register
                <HiUserAdd className="ml-2" />
              </>
            )}
          </Button>
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
