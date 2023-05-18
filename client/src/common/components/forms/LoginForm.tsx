import { Form, Formik } from "formik";
import { Alert, Button } from "react-daisyui";
import { HiLogin, HiUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAuthLoginMutation } from "../../../api/authApi";
import { useAppDispatch } from "../../../app/hooks";
import { authLoading, authSignin } from "../../../features/auth/authSlice";
import { AuthLogin } from "../../../types/auth.type";
import getCommonError from "../../utils/getCommonError";
import FormInput from "./FormInput";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("email is required"),
  password: Yup.string().required("password is required"),
});

const LoginForm = () => {
  const [authLogin, result] = useAuthLoginMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: AuthLogin) => {
    try {
      dispatch(authLoading());
      const data = await authLogin(values).unwrap();
      dispatch(authSignin(data.payload));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleBlur, handleChange, errors }) => (
        <>
          {result.isError ? (
            getCommonError(result.error) ? (
              <Alert status="error">{getCommonError(result.error)}</Alert>
            ) : null
          ) : null}
          <Form className="flex flex-col gap-2">
            <FormInput
              id="email"
              labelText="Email"
              name="email"
              placeholder="someone@example.com"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.email}
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
              errorText={errors.password}
            />
            <div className="flex items-center gap-2 mt-5">
              <Button endIcon={<HiLogin />} color="primary" type="submit">
                Login
              </Button>
              <Link to={"/register"}>
                <Button endIcon={<HiUserAdd />} color="warning" type="button">
                  Register
                </Button>
              </Link>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default LoginForm;
