import { useCreateLayoutMutation } from "@/api/layoutApi";
import {
  layoutStyleOptions,
  layoutThemeOptions,
} from "@/config/constant-values";
import { contentColor, primaryColor } from "@/config/defaultColors";
import {
  ILayout,
  LayoutCreate,
  LayoutStyle,
  LayoutStyleEnum,
  LayoutTheme,
  LayoutThemeEnum,
} from "@/types/layout.type";
import { setFormError } from "@/utils/setFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HiPencilAlt, HiX } from "react-icons/hi";
import { toast } from "react-toastify";
import * as z from "zod";
import LoadingButton from "../../button/LoadingButton";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import FormColor from "../FormColor";
import FormSelect, { FormSelectItem } from "../FormSelect";

const formSchema = z.object({
  theme: z.nativeEnum(LayoutThemeEnum, {
    invalid_type_error: "Invalid theme type",
  }),
  primaryColor: z
    .string()
    .trim()
    .regex(/^$|^#([0-9a-f]{3}){1,2}$/i, "Invalid hex color")
    .nullable(),
  contentColor: z
    .string()
    .trim()
    .regex(/^$|^#([0-9a-f]{3}){1,2}$/i, "Invalid hex color")
    .nullable(),
  style: z.nativeEnum(LayoutStyleEnum, {
    invalid_type_error: "Invalid style type",
  }),
});

type Props = {
  className?: string;
  submitCallback?: (layout: ILayout) => any;
  cancelCallback?: () => any;
};
const LayoutCreateForm = ({
  className = "",
  submitCallback = () => {},
  cancelCallback = () => {},
}: Props) => {
  const [createLayout] = useCreateLayoutMutation();
  const form = useForm<LayoutCreate>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: "SYSTEM",
      style: "ROUNDED",
      contentColor,
      primaryColor,
    },
  });
  const { handleSubmit, formState, clearErrors, setError } = form;

  const onSubmit = async (values: LayoutCreate) => {
    try {
      const response = await toast.promise(createLayout(values).unwrap(), {
        error: "Error in creating layout!",
        pending: "Creating layout...",
        success: "Layout created!",
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
        <FormSelect
          label="Site Theme"
          name="theme"
          placeholder="Select Default Theme"
        >
          {Object.keys(layoutThemeOptions).map((k) => (
            <FormSelectItem key={k} value={k}>
              {layoutThemeOptions[k as LayoutTheme]}
            </FormSelectItem>
          ))}
        </FormSelect>

        <FormSelect
          label="Shape Style"
          name="style"
          placeholder="Select shape style"
        >
          {Object.keys(layoutStyleOptions).map((k) => (
            <FormSelectItem key={k} value={k}>
              {layoutStyleOptions[k as LayoutStyle]}
            </FormSelectItem>
          ))}
        </FormSelect>

        <FormColor
          label="Primary color"
          name="primaryColor"
          defaultValue={primaryColor}
        />
        <FormColor
          label="Content color"
          name="contentColor"
          defaultValue={contentColor}
        />

        <div className="flex items-center gap-2 mt-10">
          <LoadingButton
            variant="default"
            type="submit"
            disabled={formState.isSubmitting && !formState.isValid}
            isLoading={formState.isSubmitting}
          >
            Create <HiPencilAlt className="ml-2" />
          </LoadingButton>
          <Button variant="destructive" onClick={cancelCallback} type="reset">
            Cancel <HiX className="ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LayoutCreateForm;
