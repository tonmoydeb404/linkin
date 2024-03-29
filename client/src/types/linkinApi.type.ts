export type LinkinApiError<T = Record<string, string>> = {
  statusCode: number;
  errors: {
    common?: string;
  } & T;
};

export type LinkinApiCollectionResponse<T = any> = {
  result: T[];
  count: number;
};

export type LinkinApiResponse<T = any> = {
  result: T;
};
