import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HiPlus, HiX } from "react-icons/hi";
import { toast } from "react-toastify";
import * as z from "zod";
import { useCreateSocialMutation } from "../../../../api/socialApi";
import socialSites from "../../../../data/social-sites";
import LoadingButton from "../../button/LoadingButton";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import FormInput from "../FormInput";
import FormSelect, { FormSelectItem } from "../FormSelect";

const socialSchema = z.object({
  site: z.enum(socialSites, { invalid_type_error: "invalid Site Name" }),
  url: z.string().url("URL is not valid").trim(),
});

type SocialSchema = z.infer<typeof socialSchema>;

type Props = {
  submitCallback?: () => any;
  cancelCallback?: () => any;
  className?: string;
};

const SocialCreateForm = ({
  cancelCallback = () => {},
  submitCallback = () => {},
  className = "",
}: Props) => {
  const [createSocial] = useCreateSocialMutation();

  const form = useForm<SocialSchema>({
    resolver: zodResolver(socialSchema),
    defaultValues: {
      site: "FACEBOOK",
      url: "",
    },
  });
  const { handleSubmit, formState, clearErrors, setError, reset } = form;

  const onSubmit = async (values: SocialSchema) => {
    try {
      await toast.promise(createSocial(values).unwrap(), {
        error: "Error in Creating social link!",
        pending: "Creating social link",
        success: "Social link is created!",
      });
      clearErrors();
      reset();
      submitCallback();
    } catch (error: any) {
      const fields = Object.keys(values);
      if (error?.data?.errors) {
        Object.keys(error.data.errors).forEach((er) => {
          if (fields.includes(er)) {
            setError(er as keyof typeof values, {
              message: error.data.errors[er],
            });
          } else {
            setError("root", { message: error.data.errors[er] });
          }
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className={`flex flex-col gap-2 ${className}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormSelect
          label="Social Site"
          name="site"
          placeholder="Select Social Sites"
        >
          {socialSites.map((site) => (
            <FormSelectItem value={site} key={site}>
              {site}
            </FormSelectItem>
          ))}
        </FormSelect>

        <FormInput label="URL" name="url" />

        <div className="flex items-center gap-2 mt-5">
          <LoadingButton
            size="sm"
            type="submit"
            disabled={!formState.isValid || formState.isSubmitting}
            isLoading={formState.isSubmitting}
          >
            Add <HiPlus className="ml-2" />
          </LoadingButton>
          <Button
            variant="destructive"
            size="sm"
            onClick={cancelCallback}
            type="reset"
          >
            Cancel <HiX className="ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SocialCreateForm;
