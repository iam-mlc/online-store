import {
  withScaleEffect,
  ScaleEffectProps,
} from "@/components/hocs/withScaleEffect";
import { Next as Icon } from "@/components/Icons";

interface NextProps extends ScaleEffectProps {}

const Next: React.FC<NextProps> = ({ ...props }) => {
  return (
    <button
      // className={`${className !== undefined ? className : ""} block`}
      // onClick={onClick}
      // disabled={disabled}
      {...props}
    >
      <Icon className="opacity-70" />
    </button>
  );
};

export default withScaleEffect(Next);
