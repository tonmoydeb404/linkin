import { SelectContent } from "@radix-ui/react-select";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type FormSelectProps = {
  name: string;
  label?: string;
  placeholder: string;
  children?: ReactNode;
};

const FormSelect = ({
  name,
  label,
  placeholder,
  children,
}: FormSelectProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-background border border-input z-10 rounded-md">
              <SelectGroup>{children}</SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormSelectItem = SelectItem;

export default FormSelect;
