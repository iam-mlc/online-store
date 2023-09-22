import toCamelCase from "@/utils/toCamelCase";
import { RenderProps } from "../CheckoutForm";
import { ErrorMessage, Field } from "formik";
import checkoutSchema from "../helpers/validationSchema/schema";
import isFieldRequired from "../helpers/isFieldRequired";

interface FormInputProps {
  label: string;
  hasPlaceholder?: boolean;
  receivesComponent: React.FC<RenderProps>;
  handleErrorMessage: (msg: string) => JSX.Element;
  hasNote?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  hasPlaceholder,
  receivesComponent,
  handleErrorMessage,
  hasNote,
}) => {
  const fieldName = toCamelCase(label);
  const isRequired = isFieldRequired(fieldName, checkoutSchema);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={fieldName} className="ml-2">
        <span>{label}</span>
        {isRequired && <span className="text-red-500">*</span>}
        <span className="text-[0.8em] text-black/[.85] ml-2">{hasNote}</span>
      </label>
      <Field
        id={fieldName}
        name={fieldName}
        placeholder={
          hasPlaceholder
            ? `${label} ${isRequired ? "(Required) " : "(Optional)"}`
            : ""
        }
        component={receivesComponent || undefined}
      />
      <div className="ml-2">
        <ErrorMessage name={fieldName} render={handleErrorMessage} />
      </div>
    </div>
  );
};

export default FormInput;
