import toCamelCase from "@/utils/toCamelCase";
import { object, string, number, date } from "yup";
import "yup-phone-lite";
// import currentDate from "@/utils/currentDate";

let validationData = [
  {
    label: "First Name",
    schema: string()
      .min(2, "This first name is too short")
      .max(50, "This first name is too long")
      .required("Please write your first name"),
    value: "",
  },
  {
    label: "Last Name",
    schema: string()
      .min(2, "This last name is too short")
      .max(50, "This last name is too long")
      .required("Please write your last name"),
    value: "",
  },
  {
    label: "Email",
    schema: string().email("Please enter a valid e-mail address"),
    value: "",
  },
  {
    label: "Phone Number",
    schema: string()
      .phone(
        "MZ",
        "Phone must be a valid phone number for region MZ"
      )
      .required("Please write your phone number"),
    value: "",
  },
  {
    label: "delivery",
    // schema: ,
    value: "No"
  }
];

export default validationData;
