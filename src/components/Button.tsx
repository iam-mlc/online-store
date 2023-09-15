import { Button as AriakitButton } from "@ariakit/react";
import Link from "next/link";

interface IButtonProps {
  children?: React.ReactNode;
  state?:
    | "normal"
    | "disabled"
    | "loading"
    | "success"
    | "error"
    | "warning"
    | "info"
    | "outlined";
  disabled?: boolean;
  asLink?: boolean;
  href?: string;
}
interface ButtonProps extends React.HTMLAttributes<HTMLElement>, React.ButtonHTMLAttributes<HTMLElement>  {

}

const Button: React.FC<ButtonProps> = ({children, ...props }) => {
  return (
    <button {...props}>
      {children}
    </button>
  );
}

// const Button: React.FunctionComponent<IButtonProps> = ({
//   children,
//   state,
//   disabled,
//   asLink,
//   href,
//   ...props
// }) => {
//   let styles;
//   const layout = "font-bold py-2 lg:px-8 md:px-8 sm:px-6  rounded-full lg:text-[1em] md:text-[1em] sm:text-[0.8em] inline-block";
//   const iconSize = "w-6 h-6";
//   const icons = {
//     normal: <FaCheckCircle className={`${iconSize}`} />,
//     loading: <FaSpinner className={`${iconSize} animate-spin`} />,
//     success: <FaCheckCircle className={`${iconSize}`} />,
//     error: <FaTimesCircle className={`${iconSize}`} />,
//     warning: <FaExclamationCircle className={`${iconSize}`} />,
//     info: <FaInfoCircle className={`${iconSize}`} />,
//   };
//   let content;
//   let mainColor = "bg-gray-500 text-white focus:outline-none focus:ring focus:ring-black";
  
//   switch (disabled ? "disabled" : state) {
//     case "normal": {
//       styles = `${layout} ${mainColor} hover:bg-gray-700`;
//       content = children;
//       break;
//     }
//     case "disabled": {
//       styles = `${layout} ${mainColor} opacity-[45%] cursor-not-allowed`;
//       content = children;
//       break;
//     }
//     case "loading": {
//       styles = `${layout} ${mainColor}`;
//       content = icons.loading;
//       break;
//     }
//     case "success": {
//       styles = `${layout} ${mainColor}`;
//       content = icons.success;
//       break;
//     }
//     case "error": {
//       styles = `${layout} ${mainColor}`;
//       content = icons.error;
//       break;
//     }
//     case "warning": {
//       styles = `${layout} ${mainColor}`;
//       content = icons.warning;
//       break;
//     }
//     case "info": {
//       styles = `${layout} ${mainColor}`;
//       content = icons.info;
//       break;
//     }
//     case "outlined": {
//       styles = `${layout} border-2 border-gray-500 text-gray-500 hover:bg-gray-700 hover:text-white hover:border-gray-700`;
//       content = children;
//       break;
//     }
//     default: {
//       styles = `${layout} ${mainColor} hover:bg-gray-700`;
//       content = children;
//       break;
//     }
//   }
//   return (
//     <>
//       {asLink ? (
//         <Link href={href === undefined ? "/" : href} className={styles}><span>{content}</span></Link>
//       ) : (
//         <AriakitButton className={styles} disabled={disabled} {...props}>
//           <span>{content}</span>
//         </AriakitButton>
//       )}
//     </>
//   );
// };

export default Button;


