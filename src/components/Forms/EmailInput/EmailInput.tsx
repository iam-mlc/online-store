import { RenderProps } from "../CheckoutForm";
import Input from "../Input/Input";

const EmailInput: React.FC<RenderProps> = ({ field, form, ...props }) => {
  return <Input {...field} {...props} type="email" />;
};

export default EmailInput;
