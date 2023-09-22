import {
  withScaleEffect,
  ScaleEffectProps,
} from "@/components/hocs/withScaleEffect";
import { Reset as Icon } from "@/components/Icons";

interface ResetButtonProps extends ScaleEffectProps {}

const ResetButton: React.FC<ResetButtonProps> = ({ ...props }) => {
  return (
    <button
      {...props}
    >
      <Icon className="opacity-70" />
    </button>
  );
};

export default withScaleEffect(ResetButton);
