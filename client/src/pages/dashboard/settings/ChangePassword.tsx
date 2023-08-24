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

      <div className="mb-10">
        <h2 className="text-xl font-semibold">Change password</h2>
        <p className="text-sm text-muted-foreground mt-1">
          by changing password you will logout from all previous device you have
          used.
        </p>
      </div>
      <UpdatePasswordForm
        cancelCallback={() => navigate("/dashboard")}
        className="max-w-md"
      />
    </>
  );
};

export default ChangePassword;
