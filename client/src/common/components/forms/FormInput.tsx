import { Input, InputProps } from "react-daisyui";
import { HiExclamationCircle } from "react-icons/hi";

type FormInputProps = {
  id: string;
  labelText: string;
  errorText?: string;
} & InputProps;

const FormInput = ({ labelText, id, errorText, ...props }: FormInputProps) => {
  return (
    <div className="form-control w-full">
      <label htmlFor={id} className="label">
        <span className="label-text">{labelText}</span>
      </label>
      <Input id={id} {...props} />
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

export default FormInput;
