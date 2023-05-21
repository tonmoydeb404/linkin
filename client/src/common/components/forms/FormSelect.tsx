import { ReactNode } from "react";
import { Select, SelectProps } from "react-daisyui";
import { HiExclamationCircle } from "react-icons/hi";

type FormSelectProps = {
  id: string;
  labelText: string;
  errorText?: string;
  children?: ReactNode;
} & SelectProps;

const FormSelect = ({
  labelText,
  id,
  errorText,
  children,
  ...props
}: FormSelectProps) => {
  return (
    <div className="form-control w-full">
      <label htmlFor={id} className="label">
        <span className="label-text">{labelText}</span>
      </label>
      <Select id={id} {...props}>
        {children}
      </Select>
      {errorText ? (
        <label htmlFor={id} className="label p-0 mt-1.5">
          <span className="label-text text-xs text-error flex items-center gap-1">
            <HiExclamationCircle /> {errorText}
          </span>
        </label>
      ) : null}
    </div>
  );
};

export default FormSelect;
