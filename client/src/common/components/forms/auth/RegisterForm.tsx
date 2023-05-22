import { Form, Formik, FormikHelpers } from "formik";
import { Alert, Button } from "react-daisyui";
import { HiLogin, HiUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useAuthRegisterMutation } from "../../../../api/authApi";
import { useAppDispatch } from "../../../../app/hooks";
import {
  authLoading,
  authSignin,
  authSignout,
} from "../../../../features/auth/authSlice";
import { AuthRegister } from "../../../../types/auth.type";
import FormInput from "../FormInput";
YupPassword(Yup);

const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "too short!")
    .max(50, "too long")
    .required("first name is required"),
  lastName: Yup.string()
    .min(2, "too short!")
    .max(50, "too long")
    .required("last name is required"),
  email: Yup.string().email("invalid email").required("email is required"),
  password: Yup.string()
    // .password()
    .min(6, "too short!")
    .required("password is required"),
  username: Yup.string()
    .required("username is required")
    .min(3, "too short!")
    .max(50, "too long!"),
});

const RegisterForm = () => {
  const [authRegister] = useAuthRegisterMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (
    values: AuthRegister,
    { setStatus }: FormikHelpers<AuthRegister>
  ) => {
    try {
      dispatch(authLoading());
      const data = await authRegister(values).unwrap();
      setStatus({});
      dispatch(authSignin(data.payload));
    } catch (error: any) {
      if (error?.data) setStatus(error.data.errors);
      // console.log(error);
      dispatch(authSignout());
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
      }}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleBlur,
        handleChange,
        errors,
        status,
        isValid,
        isSubmitting,
      }) => {
        return (
          <Form className="flex flex-col gap-2">
            {status?.common ? (
              <Alert status="error">{status.common}</Alert>
            ) : null}
            <FormInput
              id="firstName"
              labelText="First Name"
              name="firstName"
              placeholder="Jhon"
              type="text"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.firstName || status?.firstName}
            />
            <FormInput
              id="lastName"
              labelText="Last Name"
              name="lastName"
              placeholder="Doe"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.lastName || status?.lastName}
            />
            <FormInput
              id="username"
              labelText="Username"
              name="username"
              placeholder="jhondoe"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.username || status?.username}
            />
            <FormInput
              id="email"
              labelText="Email"
              name="email"
              placeholder="someone@example.com"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.email || status?.email}
            />
            <FormInput
              id="password"
              labelText="Password"
              name="password"
              placeholder="***********"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.password || status?.password}
            />
            <div className="flex items-center gap-2 mt-5">
              <Button
                endIcon={<HiUserAdd />}
                color="primary"
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Register
              </Button>
              <Link to={"/login"}>
                <Button endIcon={<HiLogin />} color="warning" type="reset">
                  Login
                </Button>
              </Link>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
