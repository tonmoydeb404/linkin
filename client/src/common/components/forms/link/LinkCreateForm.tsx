import { Form, Formik, FormikHelpers } from "formik";
import { Button } from "react-daisyui";
import { HiPlus, HiX } from "react-icons/hi";
import * as Yup from "yup";
import { useCreateLinkMutation } from "../../../../api/linkApi";
import { LinkCreate } from "../../../../types/link.type";
import FormInput from "../FormInput";

const linkSchema = Yup.object().shape({
  title: Yup.string().trim().required("Link title is required"),
  url: Yup.string()
    .url("URL is not valid")
    .trim()
    .required("Link URL is required"),
  icon: Yup.string().url("Icon URL is not valid").trim().optional(),
  slug: Yup.string()
    .min(3, "Minimum 3 character is required")
    .max(50, "Maximum 50 character is allowed")
    .optional(),
});

type Props = {
  onSubmit?: () => any;
  onCancel?: () => any;
};

const LinkCreateForm = ({
  onCancel = () => {},
  onSubmit = () => {},
}: Props) => {
  const [createLink] = useCreateLinkMutation();

  const handleSubmit = async (
    values: LinkCreate,
    { setStatus, resetForm }: FormikHelpers<any>
  ) => {
    try {
      await createLink(values).unwrap();
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
        title: "",
        slug: "",
        icon: "",
        url: "",
      }}
      validationSchema={linkSchema}
      onSubmit={handleSubmit}
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
              id="slug"
              labelText="Slug"
              name="slug"
              value={values.slug}
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.slug || status?.slug}
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
                disabled={!isValid || isSubmitting}
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

export default LinkCreateForm;
