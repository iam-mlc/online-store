import { RenderProps } from "../CheckoutForm";
import Input from "../Input/Input";

const PhoneNumberInput: React.FC<RenderProps> = ({ field, form, ...props }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const regex = /^[0-9+\-() ]*$/;

    if (value === "" || regex.test(value)) {
      form.setFieldValue(field.name, value);
    }
  };

  return <Input {...field} {...props} type="tel" onChange={handleChange} />;
};

export default PhoneNumberInput;
