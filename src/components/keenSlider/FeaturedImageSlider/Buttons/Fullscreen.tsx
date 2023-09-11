import {
  withScaleEffect,
  ScaleEffectProps,
} from "@/components/hocs/withScaleEffect";
import { Fullscreen as Icon } from "@/components/Icons";

interface FullscreenProps extends ScaleEffectProps {}

const Fullscreen: React.FC<FullscreenProps> = ({ className }) => {
  return <Icon className={className} />;
};

export default withScaleEffect(Fullscreen);
