import { useAppSelector } from "@/app/hooks";
import UpdateUsernameForm from "@/common/components/forms/user/UpdateUsernameForm";
import { selectAuth } from "@/features/auth/authSlice";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const ChangeUsername = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(selectAuth);
  return (
    <>
      <Helmet>
        <title>Update Username - LinkIn</title>
      </Helmet>

      <div className="mb-10 flex items-center gap-2 flex-wrap">
        <h2 className="text-xl font-semibold">Update Username</h2>
        <span>{user ? `(${user.username})` : null}</span>
      </div>
      <UpdateUsernameForm
        cancelCallback={() => navigate("/dashboard")}
        className="max-w-md"
      />
    </>
  );
};

export default ChangeUsername;
