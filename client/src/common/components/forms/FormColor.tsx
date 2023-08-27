import { useFormContext } from "react-hook-form";
import { HiRefresh } from "react-icons/hi";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input, InputProps } from "../ui/input";

type FormColorProps = {
  name: string;
  label?: string;
  defaultValue: string;
} & Omit<InputProps, "name" | "type" | "defaultValue">;

const FormColor = ({ name, label, defaultValue, ...rest }: FormColorProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <div className="flex w-full items-center space-x-2">
            <FormControl>
              <Input {...rest} {...field} type="color" />
            </FormControl>
            <Button
              size={"icon"}
              onClick={() => form.setValue(name, defaultValue)}
              variant={"ghost"}
              type="button"
            >
              <HiRefresh className="text-lg" />
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormColor;
