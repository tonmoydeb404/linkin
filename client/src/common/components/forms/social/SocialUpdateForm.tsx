import { Form, Formik, FormikHelpers } from "formik";
import { Button } from "react-daisyui";
import { HiPencilAlt, HiX } from "react-icons/hi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useUpdateSocialMutation } from "../../../../api/socialApi";
import socialSites from "../../../../data/social-sites";
import { ISocial, SocialUpdate } from "../../../../types/social.type";
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
  social: ISocial | null;
};

const SocialUpdateForm = ({
  onCancel = () => {},
  onSubmit = () => {},
  social,
  className = "",
}: Props) => {
  const [updateSocial] = useUpdateSocialMutation();

  const handleSubmit = async (
    values: SocialUpdate,
    { setStatus, resetForm }: FormikHelpers<any>
  ) => {
    if (!social?._id) return;
    try {
      await toast.promise(
        updateSocial({ id: social._id, body: values }).unwrap(),
        {
          error: "Error in updating social link!",
          pending: "Updating social link",
          success: "Updated the social link",
        }
      );
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
        site: social?.site || "FACEBOOK",
        url: social?.url || "",
      }}
      validationSchema={socialSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, handleBlur, handleChange, errors, status }) => (
        <>
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
                endIcon={<HiPencilAlt />}
                color="success"
                size="sm"
                type="submit"
              >
                Update
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

export default SocialUpdateForm;
