import UpdatePasswordForm from "@/common/components/forms/user/UpdatePasswordForm";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Change password - LinkIn</title>
      </Helmet>

      <div className="mb-10 flex items-center gap-2 flex-wrap">
        <h2 className="text-xl font-semibold">Change password</h2>
      </div>
      <UpdatePasswordForm
        cancelCallback={() => navigate("/dashboard")}
        className="max-w-md"
      />
    </>
  );
};

export default ChangePassword;
