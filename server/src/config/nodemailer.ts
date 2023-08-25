import { createTransport } from "nodemailer";
import loadEnv from "../helpers/loadEnv";

export const mailTransporter = createTransport({
  service: "gmail",
  auth: {
    user: loadEnv.MAIL_ID,
    pass: loadEnv.MAIL_PASSWORD,
  },
});

export const passwordResetMail = (email: string, name: string, link: string) =>
  mailTransporter.sendMail({
    from: loadEnv.MAIL_ID,
    to: email,
    subject: "Reset LinkIn password!",
    html: `
  <h1>Hello ${name}</h1>
  <p>Here is your reset password link. <a href="${link}">Click Here</a></p>
  `,
  });

export const emailVerificationMail = (
  email: string,
  name: string,
  link: string
) =>
  mailTransporter.sendMail({
    from: loadEnv.MAIL_ID,
    to: email,
    subject: "Verfiy your email - LinkIn",
    html: `
  <h1>Hello ${name}</h1>
  <p>Here is your email verification link. <a href="${link}">Click Here</a></p>
  `,
  });
