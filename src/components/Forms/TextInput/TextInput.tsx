import { RenderProps } from "../CheckoutForm";
import Input from "../Input/Input";

const TextInput: React.FC<RenderProps> = ({ field, form, ...props }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // regular expression to allow spaces, English alphabets and the special characters you specified
    const regex = /^[\p{L}\p{M}~'^` ]+$/u;

    if (value === "" || regex.test(value)) {
      form.setFieldValue(field.name, value);
    }
  };

  return <Input {...field} {...props} type="text" onChange={handleChange} />;
};

export default TextInput;
