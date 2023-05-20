import { Form, Formik, FormikHelpers } from "formik";
import { Button } from "react-daisyui";
import { HiPlus, HiX } from "react-icons/hi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useUpdateLinkMutation } from "../../../../api/linkApi";
import { ILink, LinkUpdate } from "../../../../types/link.type";
import FormInput from "../FormInput";

const linkSchema = Yup.object().shape({
  title: Yup.string().trim().required("Link title is required"),
  url: Yup.string()
    .url("URL is not valid")
    .trim()
    .required("Link URL is required"),
  icon: Yup.string().url("Icon URL is not valid").trim().optional(),
});

type Props = {
  onSubmit?: () => any;
  onCancel?: () => any;
  link: ILink | null;
};

const LinkUpdateForm = ({
  onCancel = () => {},
  onSubmit = () => {},
  link,
}: Props) => {
  const [updateLink] = useUpdateLinkMutation();

  const handleSubmit = async (
    values: LinkUpdate,
    { setStatus, resetForm }: FormikHelpers<any>
  ) => {
    if (!link?._id) return;
    try {
      await toast.promise(updateLink({ id: link._id, body: values }).unwrap(), {
        error: "Error in updating link!",
        pending: "Updating link",
        success: "Updated the link",
      });
      setStatus({});
      resetForm();
      onSubmit();
    } catch (error: any) {
      if (error?.data.errors) setStatus(error.data.errors);
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{
        title: link?.title || "",
        icon: link?.icon || "",
        url: link?.url || "",
      }}
      validationSchema={linkSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, handleBlur, handleChange, errors, status }) => (
        <>
          <Form className="flex flex-col gap-2">
            <FormInput
              id="title"
              labelText="Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.title || status?.title}
            />

            <FormInput
              id="url"
              labelText="URL"
              name="url"
              value={values.url}
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.url || status?.url}
            />

            <FormInput
              id="icon"
              labelText="Icon"
              name="icon"
              value={values.icon}
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.icon || status?.icon}
            />

            <div className="flex items-center gap-2 mt-5">
              <Button
                endIcon={<HiPlus />}
                color="success"
                size="sm"
                type="submit"
              >
                Add
              </Button>
              <Button
                endIcon={<HiX />}
                color="error"
                size="sm"
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

export default LinkUpdateForm;
