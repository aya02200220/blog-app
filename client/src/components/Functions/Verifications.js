import zxcvbn from "zxcvbn";
import validator from "email-validator";

export const VerifyPassword = (password) => {
  // const result = zxcvbn(password);
  const result = password.length >= 8;
  return result;
};
export const VerifyEmailAddress = (email) => {
  const result = validator.validate(email);
  return result;
};
