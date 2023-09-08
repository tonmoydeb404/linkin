import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input, InputProps } from "../ui/input";

type FormInputProps = {
  name: string;
  label?: string;
  defaultValue?: string;
} & Omit<InputProps, "name" | "defaultValue">;

const FormInput = ({ name, label, defaultValue, ...rest }: FormInputProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <FormControl>
            <Input {...rest} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
