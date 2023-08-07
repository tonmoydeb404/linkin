import { Form, Formik, FormikHelpers } from "formik";
import { Button } from "react-daisyui";
import { HiPlus, HiX } from "react-icons/hi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useCreateSocialMutation } from "../../../../api/socialApi";
import socialSites from "../../../../data/social-sites";
import { SocialCreate } from "../../../../types/social.type";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";

const socialSchema = Yup.object().shape({
  site: Yup.string()
    .oneOf(socialSites, "Unknown social site!")
    .required("Link title is required"),
  url: Yup.string()
    .url("URL is not valid")
    .trim()
    .required("Link URL is required"),
});

type Props = {
  onSubmit?: () => any;
  onCancel?: () => any;
  className?: string;
};

const SocialCreateForm = ({
  onCancel = () => {},
  onSubmit = () => {},
  className = "",
}: Props) => {
  const [createSocial] = useCreateSocialMutation();

  const handleSubmitFunc = async (
    values: SocialCreate,
    { setStatus, resetForm }: FormikHelpers<SocialCreate>
  ) => {
    try {
      await toast.promise(createSocial(values).unwrap(), {
        error: "Error in Creating social link!",
        pending: "Creating social link",
        success: "Social link is created!",
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
        site: "FACEBOOK",
        url: "",
      }}
      validationSchema={socialSchema}
      onSubmit={handleSubmitFunc}
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
        <Form className={className}>
          <FormSelect
            id="site"
            labelText="Social Site"
            name="site"
            value={values.site}
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.site || status?.site}
          >
            <option value="DEFAULT" disabled>
              Select Social Site
            </option>
            <>
              {socialSites.map((site) => (
                <option value={site} key={site}>
                  {site}
                </option>
              ))}
            </>
          </FormSelect>

          <FormInput
            id="url"
            labelText="URL"
            name="url"
            value={values.url}
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.url || status?.url}
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
      )}
    </Formik>
  );
};

export default SocialCreateForm;
