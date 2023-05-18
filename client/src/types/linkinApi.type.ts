export type LinkinApiError<T = Record<string, string>> = {
  statusCode: number;
  errors: {
    common?: string;
  } & T;
};
