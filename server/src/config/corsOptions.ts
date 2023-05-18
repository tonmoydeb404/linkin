import { CorsOptions } from "cors";
import origins from "./origins";

const corsOptions: CorsOptions = {
  credentials: true,
  optionsSuccessStatus: 200,
  origin: (requestOrigin, callback) => {
    if (!requestOrigin || origins.includes(requestOrigin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export default corsOptions;
