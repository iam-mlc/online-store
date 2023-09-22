interface ButtonProps
  extends React.HTMLAttributes<HTMLElement>,
    React.ButtonHTMLAttributes<HTMLElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export default Button;
