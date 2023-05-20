import { Textarea, TextareaProps } from "react-daisyui";
import { HiExclamationCircle } from "react-icons/hi";

type FormTextareaProps = {
  id: string;
  labelText: string;
  errorText?: string;
} & TextareaProps;

const FormTextarea = ({
  labelText,
  id,
  errorText,
  ...props
}: FormTextareaProps) => {
  return (
    <div className="form-control w-full">
      <label htmlFor={id} className="label">
        <span className="label-text">{labelText}</span>
      </label>
      <Textarea id={id} {...props} />
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

export default FormTextarea;
