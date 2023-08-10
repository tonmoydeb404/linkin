import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiPencilAlt, HiX } from "react-icons/hi";
import { toast } from "react-toastify";
import * as z from "zod";
import { useUpdateOwnProfileMutation } from "../../../../api/profileApi";
import { IProfile } from "../../../../types/profile.type";
import LoadingButton from "../../button/LoadingButton";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import FormInput from "../FormInput";
import FormTextarea from "../FormTextarea";

const profileSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  bio: z.string().optional(),
  avatar: z.string().trim().url("Avatar URL is not valid"),
});

type ProfileSchema = z.infer<typeof profileSchema>;

type Props = {
  profile: IProfile | null;
  className?: string;
  submitCallback?: (profile: IProfile) => any;
  cancelCallback?: () => any;
};
const ProfileUpdateForm = ({
  profile,
  className = "",
  submitCallback = () => {},
  cancelCallback = () => {},
}: Props) => {
  const [updateProfile] = useUpdateOwnProfileMutation();
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      avatar: profile?.avatar || "",
      bio: profile?.bio || "",
    },
  });
  const { handleSubmit, formState, clearErrors, setError, getValues, reset } =
    form;

  const onSubmit = async (values: ProfileSchema) => {
    try {
      const updatedProfile = await toast.promise(
        updateProfile(values).unwrap(),
        {
          error: "Error in updating profile!",
          pending: "Updating profile...",
          success: "Profile updated!",
        }
      );
      clearErrors();
      submitCallback(updatedProfile.results);
    } catch (error: any) {
      const fields = Object.keys(getValues());
      if (error?.data?.errors) {
        Object.keys(error.data.errors).forEach((er) => {
          if (fields.includes(er)) {
            setError(er as keyof ProfileSchema, {
              message: error.data.errors[er],
            });
          } else {
            setError("root", { message: error.data.errors[er] });
          }
        });
      }
    }
  };

  useEffect(() => {
    if (profile) reset(profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <Form {...form}>
      <form className={className} onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="First Name" name="firstName" />

        <FormInput label="Last Name" name="lastName" />

        <FormTextarea label="Bio" name="bio" />

        <FormInput label="Avatar" name="avatar" />

        <div className="flex items-center gap-2 mt-10">
          <LoadingButton
            variant="default"
            type="submit"
            disabled={formState.isSubmitting || !formState.isValid}
            isLoading={formState.isSubmitting}
          >
            Update <HiPencilAlt className="ml-2" />
          </LoadingButton>
          <Button variant="destructive" onClick={cancelCallback} type="reset">
            Cancel <HiX className="ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileUpdateForm;
