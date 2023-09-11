import { withScaleEffect } from "@/components/hocs/withScaleEffect";
import { Close as Icon } from "@/components/Icons";

interface CloseProps {}

const Close: React.FC<CloseProps> = ({}) => {
  return <Icon className="opacity-70" />;
};

export default withScaleEffect(Close);
