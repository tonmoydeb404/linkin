import DeleteForm from "@/common/components/forms/user/DeleteForm";
import { Helmet } from "react-helmet-async";

const DeleteAccount = () => {
  return (
    <>
      <Helmet>
        <title>Delete Account - LinkIn</title>
      </Helmet>

      <div className="mb-10">
        <h2 className="text-xl font-semibold">Delete Account</h2>
        <p className="text-sm text-muted-foreground mt-1">
          by deleting your account you will remove everything belongs to you.
        </p>
      </div>

      <DeleteForm className="max-w-md" />
    </>
  );
};

export default DeleteAccount;
