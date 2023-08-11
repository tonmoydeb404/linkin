import { optionalPreprocess } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HiPlus, HiX } from "react-icons/hi";
import * as z from "zod";
import { useCreateLinkMutation } from "../../../../api/linkApi";
import LoadingButton from "../../button/LoadingButton";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import FormInput from "../FormInput";

const linkSchema = z.object({
  title: z.string().trim(),
  url: z.string().url("URL is not valid").trim(),
  icon: z.preprocess(
    optionalPreprocess,
    z.string().url("Icon URL is not valid").trim().optional()
  ),
  slug: z.preprocess(
    optionalPreprocess,
    z
      .string()
      .min(3, "Minimum 3 character is required")
      .max(50, "Maximum 50 character is allowed")
      .optional()
  ),
});
type LinkSchema = z.infer<typeof linkSchema>;

type Props = {
  submitCallback?: () => any;
  cancelCallback?: () => any;
  className?: string;
};

const LinkCreateForm = ({
  cancelCallback = () => {},
  submitCallback = () => {},
  className = "",
}: Props) => {
  const [createLink] = useCreateLinkMutation();
  const form = useForm<LinkSchema>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      icon: "",
      slug: "",
      title: "",
      url: "",
    },
  });
  const { handleSubmit, formState, clearErrors, setError, reset } = form;

  const onSubmit = async (values: LinkSchema) => {
    try {
      await createLink(values).unwrap();
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
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col gap-2 ${className}`}
      >
        <FormInput id="title" label="Title" name="title" />
        <FormInput id="url" label="URL" name="url" />
        <FormInput id="slug" label="Slug" name="slug" />
        <FormInput id="icon" label="Icon" name="icon" />

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

export default LinkCreateForm;
