import { UseFormSetError } from "react-hook-form";

export const setFormError = (
  errors: Record<string, any>,
  setError: UseFormSetError<any>,
  fields: string[]
) => {
  if (!errors) return;
  Object.keys(errors).forEach((er) => {
    if (fields.includes(er)) {
      setError(er, {
        message: errors[er],
      });
    } else {
      setError("root", { message: errors[er] });
    }
  });
};
