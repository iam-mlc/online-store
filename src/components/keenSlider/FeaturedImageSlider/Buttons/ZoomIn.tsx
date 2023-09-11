import {
  withScaleEffect,
  ScaleEffectProps,
} from "@/components/hocs/withScaleEffect";
import { ZoomIn as Icon } from "@/components/Icons";

interface ZoomInButtonProps extends ScaleEffectProps {}

const ZoomInButton: React.FC<ZoomInButtonProps> = ({ ...props }) => {
  return (
    <button {...props}>
      <Icon className="opacity-70" />
    </button>
  );
};

export default withScaleEffect(ZoomInButton);
