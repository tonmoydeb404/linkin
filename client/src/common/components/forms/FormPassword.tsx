import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input, InputProps } from "../ui/input";

type FormPasswordProps = {
  name: string;
  label?: string;
} & Omit<InputProps, "name" | "type">;

const FormPassword = ({ name, label, ...rest }: FormPasswordProps) => {
  const form = useFormContext();
  const [isPassword, setIsPassword] = useState(true);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <div className="flex flex-row items-center gap-2">
            <FormControl>
              <Input
                {...rest}
                {...field}
                type={isPassword ? "password" : "text"}
              />
            </FormControl>
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => setIsPassword((prev) => !prev)}
              type="button"
            >
              {isPassword ? (
                <HiEye className="text-lg" />
              ) : (
                <HiEyeOff className="text-lg" />
              )}
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormPassword;
