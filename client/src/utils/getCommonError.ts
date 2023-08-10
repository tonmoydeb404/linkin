import { SerializedError } from "@reduxjs/toolkit";
import { LinkinApiError } from "../types/linkinApi.type";
import { ApiError } from "../types/rtkquery.type";

const getCommonError = (error: ApiError<LinkinApiError> | SerializedError) => {
  if ("data" in error && "errors" in error.data) {
    return error.data.errors.common;
  } else {
    return "something wents to wrong";
  }
};

export default getCommonError;
