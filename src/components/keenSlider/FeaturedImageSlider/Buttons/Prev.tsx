import {
  withScaleEffect,
  ScaleEffectProps,
} from "@/components/hocs/withScaleEffect";
import { Prev as Icon } from "@/components/Icons";

interface PrevProps extends ScaleEffectProps {}

const Prev: React.FC<PrevProps> = ({ ...props }) => {
  return (
    <button
      {...props}
    >
      <Icon className="opacity-70" />
    </button>
  );
};

export default withScaleEffect(Prev);
