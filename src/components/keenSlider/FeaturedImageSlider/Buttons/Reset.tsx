import {
  withScaleEffect,
  ScaleEffectProps,
} from "@/components/hocs/withScaleEffect";
import { Reset as Icon } from "@/components/Icons";

interface ResetButtonProps extends ScaleEffectProps {}

const ResetButton: React.FC<ResetButtonProps> = ({ ...props }) => {
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

export default withScaleEffect(ResetButton);
