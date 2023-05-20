import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useGetOwnProfileQuery } from "../../api/profileApi";
import { useAppDispatch } from "../../app/hooks";
import ProfileUpdateForm from "../../common/components/forms/profile/ProfileUpdateForm";
import { authUpdate } from "../../features/auth/authSlice";
import { IProfile } from "../../types/profile.type";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profile = useGetOwnProfileQuery(undefined);

  const handleUpdate = (updatedProfile: IProfile) => {
    dispatch(authUpdate(updatedProfile));
  };
  return (
    <>
      <Helmet>
        <title>Edit Profile - LinkIn</title>
      </Helmet>
      <div className="px-8 py-10">
        <h2 className="text-xl font-semibold mb-10">Edit Profile</h2>
        <ProfileUpdateForm
          className="flex flex-col gap-y-3 gap-x-5 max-w-lg"
          profile={profile?.data?.results || null}
          onSubmit={handleUpdate}
          onCancel={() => navigate("/dashboard")}
        />
      </div>
    </>
  );
};

export default EditProfile;
