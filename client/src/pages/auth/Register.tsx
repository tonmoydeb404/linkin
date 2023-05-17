import { Button, Input } from "react-daisyui";
import { HiLogin, HiOutlineHome, HiUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10">
      <div className="max-w-lg w-full flex flex-col gap-3">
        <div className="flex items-center mb-5 justify-between">
          <h2 className="text-2xl font-semibold">Register Account</h2>
          <Link to={"/"}>
            <HiOutlineHome className="text-2xl" />
          </Link>
        </div>
        <div className="form-control w-full">
          <label htmlFor="firstName" className="label">
            <span className="label-text">First Name</span>
          </label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Jhon"
          />
        </div>
        <div className="form-control w-full">
          <label htmlFor="lastName" className="label">
            <span className="label-text">Last Name</span>
          </label>
          <Input type="text" name="lastName" id="lastName" placeholder="Jhon" />
        </div>
        <div className="form-control w-full">
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <Input type="email" name="email" id="email" placeholder="Jhon" />
        </div>
        <div className="form-control w-full ">
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Doe"
          />
        </div>
        <div className="flex items-center gap-2 mt-5">
          <Button endIcon={<HiUserAdd />} color="primary">
            Register
          </Button>
          <Link to={"/login"}>
            <Button endIcon={<HiLogin />} color="warning">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
