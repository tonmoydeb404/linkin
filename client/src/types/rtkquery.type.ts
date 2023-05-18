export type ApiError<T = Record<string, never>> = {
  data: T;
  status: number;
};
