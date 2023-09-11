import {
  withScaleEffect,
  ScaleEffectProps,
} from "@/components/hocs/withScaleEffect";

interface ThumbnailProps extends ScaleEffectProps {}

const Thumbnail: React.FC<ThumbnailProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export default withScaleEffect(Thumbnail);
