import { config } from "dotenv";

config({ path: ".env.example" });
config({ path: ".env.local", override: true });

export default {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  DOMAIN: process.env.DOMAIN,
  NODE_ENV: process.env.NODE_ENV,
  PASSWORD_RESET_URL: process.env.PASSWORD_RESET_URL,
  MAIL_ID: process.env.MAIL_ID,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
};
