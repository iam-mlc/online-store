import {
  withScaleEffect,
  ScaleEffectProps,
} from "@/components/hocs/withScaleEffect";
import { ZoomOut as Icon } from "@/components/Icons";

interface ZoomOutButtonProps extends ScaleEffectProps {}

const ZoomOutButton: React.FC<ZoomOutButtonProps> = ({ ...props }) => {
  return (
    <button {...props}>
      <Icon className="opacity-70" />
    </button>
  );
};

export default withScaleEffect(ZoomOutButton);
