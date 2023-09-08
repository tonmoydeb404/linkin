import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea, TextareaProps } from "../ui/textarea";

type FormTextareaProps = {
  name: string;
  label?: string;
  defaultValue?: string;
} & Omit<TextareaProps, "name" | "defaultValue">;

const FormTextarea = ({
  name,
  label,
  defaultValue,
  ...rest
}: FormTextareaProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <FormControl>
            <Textarea {...rest} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTextarea;
