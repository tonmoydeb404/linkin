import { Helmet } from "react-helmet-async";
import { HiOutlineHome } from "react-icons/hi";
import { Link } from "react-router-dom";
import LoginForm from "../../common/components/forms/auth/LoginForm";

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Login - LinkIn</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-screen px-5 ">
        <div className="max-w-lg w-full flex flex-col gap-3">
          <div className="flex items-center mb-5 justify-between">
            <h2 className="text-2xl font-semibold">Login</h2>
            <Link to={"/"}>
              <HiOutlineHome className="text-2xl" />
            </Link>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;
