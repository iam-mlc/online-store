import {
  withScaleEffect,
  ScaleEffectProps,
} from "@/components/hocs/withScaleEffect";
import { ZoomIn, ZoomOut as Icon, Reset } from "@/components/Icons";

interface ZoomOutButtonProps extends ScaleEffectProps {}

const ZoomOutButton: React.FC<ZoomOutButtonProps> = ({ ...props }) => {
  return (
    <button {...props}>
      <Icon className="opacity-70" />
    </button>
  );
};

export default withScaleEffect(ZoomOutButton);
