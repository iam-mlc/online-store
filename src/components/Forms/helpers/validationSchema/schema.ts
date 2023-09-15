import toCamelCase from "@/utils/toCamelCase";
import validationData from "./validationData";
import "yup-phone-lite";
// import { object } from "yup";
import { object, string, number, date } from "yup";

// let schema : Record<string,any> = {};

// validationData.forEach((item) => {
//   const property = toCamelCase(item.label);
//   schema[property] = item.schema;
// });

const fields = {
  firstName: string()
    .min(2, "This first name is too short")
    .max(50, "This first name is too long")
    .required("Please write your first name"),
  lastName: string()
    .min(2, "This last name is too short")
    .max(50, "This last name is too long")
    .required("Please write your last name"),
  email: string().email("Please enter a valid e-mail address"),
  phoneNumber: string()
    .phone("MZ", "Phone must be a valid phone number for region MZ")
    .required("Please write your phone number"),
  delivery: string()
    .oneOf(["Yes", "No"], "Please select an option")
    .default("No"),
};

const checkoutSchema = object(fields);

export default checkoutSchema;
