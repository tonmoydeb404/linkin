import { setFormError } from "@/utils/setFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HiPlus, HiX } from "react-icons/hi";
import { toast } from "react-toastify";
import * as z from "zod";
import { useCreateProfileMutation } from "../../../../api/profileApi";
import { IProfile } from "../../../../types/profile.type";
import LoadingButton from "../../button/LoadingButton";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import FormInput from "../FormInput";
import FormTextarea from "../FormTextarea";

const formSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  bio: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
  className?: string;
  submitCallback?: (profile: IProfile) => any;
  cancelCallback?: () => any;
};
const ProfileCreateForm = ({
  className = "",
  submitCallback = () => {},
  cancelCallback = () => {},
}: Props) => {
  const [createProfile] = useCreateProfileMutation();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  const { handleSubmit, formState, clearErrors, setError } = form;

  const onSubmit = async (values: FormSchema) => {
    try {
      const response = await toast.promise(createProfile(values).unwrap(), {
        error: "Error in updating profile!",
        pending: "Updating profile...",
        success: "Profile updated!",
      });
      clearErrors();
      submitCallback(response.result);
    } catch (error: any) {
      setFormError(error?.data?.errors, setError, Object.keys(values));
    }
  };

  return (
    <Form {...form}>
      <form className={className} onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="First Name" name="firstName" defaultValue={""} />

        <FormInput label="Last Name" name="lastName" defaultValue={""} />

        <FormTextarea label="Bio" name="bio" defaultValue={""} />

        <div className="flex items-center gap-2 mt-10">
          <LoadingButton
            variant="default"
            type="submit"
            disabled={formState.isSubmitting || !formState.isValid}
            isLoading={formState.isSubmitting}
          >
            Create <HiPlus className="ml-2" />
          </LoadingButton>
          <Button variant="destructive" onClick={cancelCallback} type="reset">
            Cancel <HiX className="ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileCreateForm;
