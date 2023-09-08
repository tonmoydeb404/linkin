import { useGetOwnProfileQuery } from "@/api/profileApi";
import { useAppDispatch } from "@/app/hooks";
import DialogWrapper from "@/common/components/dialog/DialogWrapper";
import ProfileCreateForm from "@/common/components/forms/profile/ProfileCreateForm";
import ProfileUpdateForm from "@/common/components/forms/profile/ProfileUpdateForm";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/common/components/ui/alert";
import { Button } from "@/common/components/ui/button";
import { authUpdate } from "@/features/auth/authSlice";
import { IProfile } from "@/types/profile.type";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profile = useGetOwnProfileQuery(undefined);
  const [showModal, setShowModal] = useState(false);

  const handleUpdate = (updatedProfile: IProfile) => {
    dispatch(authUpdate(updatedProfile));
  };

  if (profile.isError && "data" in profile.error) {
    if (profile.error.data.statusCode === 404) {
      return (
        <>
          <Helmet>
            <title>Initialize Profile - LinkIn</title>
          </Helmet>

          <div className="flex w-full h-full flex-col items-center justify-center">
            <Alert className="mb-5 max-w-md">
              <AlertCircleIcon />
              <AlertTitle>Profile not found!</AlertTitle>
              <AlertDescription>
                Look like your profile is not created. create this now!
              </AlertDescription>
            </Alert>

            <Button onClick={() => setShowModal(true)}>Create Profile</Button>
          </div>
          <DialogWrapper
            open={showModal}
            onChange={setShowModal}
            title="Add Social Link"
          >
            <ProfileCreateForm
              className="flex flex-col gap-y-3 gap-x-5"
              submitCallback={(p) => {
                handleUpdate(p);
                setShowModal(false);
                profile.refetch();
              }}
              cancelCallback={() => setShowModal(false)}
            />
          </DialogWrapper>
        </>
      );
    }
  }

  if (profile.isSuccess) {
    return (
      <>
        <Helmet>
          <title>Edit Profile - LinkIn</title>
        </Helmet>

        <h2 className="text-xl font-semibold mb-10">Edit Profile</h2>
        <ProfileUpdateForm
          className="flex flex-col gap-y-3 gap-x-5 max-w-lg"
          profile={profile?.data?.result || null}
          submitCallback={handleUpdate}
          cancelCallback={() => navigate("/dashboard")}
        />
      </>
    );
  }

  return "loading...";
};

export default EditProfile;
