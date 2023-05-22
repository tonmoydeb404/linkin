import { Form, Formik, FormikHelpers } from "formik";
import { Button } from "react-daisyui";
import { HiPencilAlt, HiX } from "react-icons/hi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useUpdateOwnProfileMutation } from "../../../../api/profileApi";
import { IProfile, ProfileUpdate } from "../../../../types/profile.type";
import FormInput from "../FormInput";
import FormTextarea from "../FormTextarea";

const profileSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("First Name is required"),
  lastName: Yup.string().trim().required("Last Name is required"),
  bio: Yup.string().optional(),
  avatar: Yup.string()
    .trim()
    .url("Avatar URL is not valid")
    .required("Avatar is required"),
});

type Props = {
  profile: IProfile | null;
  className?: string;
  onSubmit?: (profile: IProfile) => any;
  onCancel?: () => any;
};
const ProfileUpdateForm = ({
  profile,
  className = "",
  onSubmit = () => {},
  onCancel = () => {},
}: Props) => {
  const [updateProfile] = useUpdateOwnProfileMutation();

  const handleUpdate = async (
    values: ProfileUpdate,
    { setStatus }: FormikHelpers<any>
  ) => {
    try {
      const updatedProfile = await toast.promise(
        updateProfile(values).unwrap(),
        {
          error: "Error in updating profile!",
          pending: "Updating profile...",
          success: "Profile updated!",
        }
      );
      setStatus({});
      onSubmit(updatedProfile.results);
    } catch (error: any) {
      if (error?.data) setStatus(error.data.errors);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: profile?.firstName || "",
        lastName: profile?.lastName || "",
        bio: profile?.bio || "",
        avatar: profile?.avatar || "",
      }}
      validationSchema={profileSchema}
      onSubmit={handleUpdate}
      enableReinitialize
    >
      {({
        values,
        handleBlur,
        handleChange,
        errors,
        status,
        isValid,
        isSubmitting,
      }) => (
        <>
          <Form className={className}>
            <FormInput
              id="firstName"
              labelText="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.firstName || status?.firstName}
            />

            <FormInput
              id="lastName"
              labelText="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.lastName || status?.lastName}
            />

            <FormTextarea
              id="bio"
              labelText="Bio"
              name="bio"
              value={values.bio}
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.bio || status?.bio}
            />

            <FormInput
              id="avatar"
              labelText="Avatar"
              name="avatar"
              value={values.avatar}
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.avatar || status?.avatar}
            />

            <div className="flex items-center gap-2 mt-10">
              <Button
                endIcon={<HiPencilAlt />}
                color="success"
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Update
              </Button>
              <Button
                endIcon={<HiX />}
                color="error"
                onClick={onCancel}
                type="reset"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default ProfileUpdateForm;
