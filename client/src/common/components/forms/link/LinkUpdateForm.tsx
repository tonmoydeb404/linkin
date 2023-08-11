import { optionalPreprocess } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiPencilAlt, HiX } from "react-icons/hi";
import { toast } from "react-toastify";
import * as z from "zod";
import { useUpdateLinkMutation } from "../../../../api/linkApi";
import { ILink } from "../../../../types/link.type";
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
});
type LinkSchema = z.infer<typeof linkSchema>;

type Props = {
  submitCallback?: () => any;
  cancelCallback?: () => any;
  className?: string;
  link: ILink | null;
};

const LinkUpdateForm = ({
  cancelCallback = () => {},
  submitCallback = () => {},
  className = "",
  link,
}: Props) => {
  const [updateLink] = useUpdateLinkMutation();

  const form = useForm<LinkSchema>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: "",
      icon: "",
      url: "",
    },
  });
  const { handleSubmit, formState, clearErrors, setError, reset } = form;

  const onSubmit = async (values: LinkSchema) => {
    if (!link?._id) return;
    try {
      await toast.promise(updateLink({ id: link._id, body: values }).unwrap(), {
        error: "Error in updating link!",
        pending: "Updating link",
        success: "Updated the link",
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
      console.log(error);
    }
  };

  useEffect(() => {
    if (link) reset(link);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col gap-2 ${className}`}
      >
        <FormInput label="Title" name="title" />

        <FormInput label="URL" name="url" />

        <FormInput label="Icon" name="icon" />

        <div className="flex items-center gap-2 mt-5">
          <LoadingButton
            size="sm"
            type="submit"
            disabled={!formState.isValid || formState.isSubmitting}
            isLoading={formState.isSubmitting}
          >
            Update <HiPencilAlt className="ml-2" />
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

export default LinkUpdateForm;
