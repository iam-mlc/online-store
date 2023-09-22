import validationData from "./validationData";
import toCamelCase from "@/utils/toCamelCase";

let initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  delivery: "No",
};

// validationData.forEach((item) => {
//   const property = toCamelCase(item.label);
//   initialValues[property] = item.value;
// });

export default initialValues;
