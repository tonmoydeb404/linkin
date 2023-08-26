import { useUpdateLayoutMutation } from "@/api/layoutApi";
import {
  layoutStyleOptions,
  layoutThemeOptions,
} from "@/config/constant-values";
import {
  ILayout,
  LayoutStyle,
  LayoutStyleEnum,
  LayoutTheme,
  LayoutThemeEnum,
  LayoutUpdate,
} from "@/types/layout.type";
import { setFormError } from "@/utils/setFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiPencilAlt, HiX } from "react-icons/hi";
import { toast } from "react-toastify";
import * as z from "zod";
import LoadingButton from "../../button/LoadingButton";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import FormInput from "../FormInput";
import FormSelect, { FormSelectItem } from "../FormSelect";

const formSchema = z.object({
  defaultTheme: z
    .nativeEnum(LayoutThemeEnum, { invalid_type_error: "Invalid theme type" })
    .optional(),
  color: z.string().optional(),
  style: z
    .nativeEnum(LayoutStyleEnum, { invalid_type_error: "Invalid style type" })
    .optional(),
});

type Props = {
  data: ILayout | null;
  className?: string;
  submitCallback?: (layout: ILayout) => any;
  cancelCallback?: () => any;
};
const LayoutUpdateForm = ({
  data,
  className = "",
  submitCallback = () => {},
  cancelCallback = () => {},
}: Props) => {
  const [updateLayout] = useUpdateLayoutMutation();
  const form = useForm<LayoutUpdate>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: "",
    },
  });
  const { handleSubmit, formState, clearErrors, setError, reset } = form;

  const onSubmit = async (values: LayoutUpdate) => {
    try {
      const response = await toast.promise(updateLayout(values).unwrap(), {
        error: "Error in updating layout!",
        pending: "Updating layout...",
        success: "Layout updated!",
      });
      clearErrors();
      submitCallback(response.result);
    } catch (error: any) {
      setFormError(error?.data?.errors, setError, Object.keys(values));
    }
  };

  useEffect(() => {
    if (data)
      reset({
        color: data.color,
        defaultTheme: data.defaultTheme,
        style: data.style,
      });
  }, [data, reset]);

  return (
    <Form {...form}>
      <form className={className} onSubmit={handleSubmit(onSubmit)}>
        <FormSelect
          label="Default Theme"
          name="defaultTheme"
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

        <FormInput label="Theme color" name="color" />

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

export default LayoutUpdateForm;
