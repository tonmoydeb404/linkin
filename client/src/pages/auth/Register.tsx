import { Helmet } from "react-helmet-async";
import { HiOutlineHome } from "react-icons/hi";
import { Link } from "react-router-dom";
import RegisterForm from "../../common/components/forms/auth/RegisterForm";

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Register - LinkIn</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-screen py-10">
        <div className="max-w-lg w-full flex flex-col gap-3">
          <div className="flex items-center mb-5 justify-between">
            <h2 className="text-2xl font-semibold">Register Account</h2>
            <Link to={"/"}>
              <HiOutlineHome className="text-2xl" />
            </Link>
          </div>
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default Register;
