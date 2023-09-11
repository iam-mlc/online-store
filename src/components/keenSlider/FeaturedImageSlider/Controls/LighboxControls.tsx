import ZoomIn from "../Buttons/ZoomIn";
import ZoomOut from "../Buttons/ZoomOut";
import Reset from "../Buttons/Reset";
import { useEffect } from "react";

interface LightBoxControlsProps {
  handlesZoomIn: any;
  handlesZoomOut: any;
  handlesResetTransform: any;
  className?: string;
  canViewSlideChange: boolean;
}

const LightBoxControls: React.FC<LightBoxControlsProps> = ({
  handlesZoomIn: handleZoomIn,
  handlesZoomOut: handleZoomOut,
  handlesResetTransform: handleResetTransform,
  className,
  canViewSlideChange: slideChanged,
}) => {
  useEffect(() => {
    if (slideChanged) {
      handleResetTransform();
    }
  }, [slideChanged]);

  return (
    <div className="absolute lg:top-3 lg:right-4 lg:translate-x-0 lg:bottom-auto lg:left-auto sm:bottom-3 sm:left-1/2 sm:-translate-x-1/2 flex gap-2 ">
      <ZoomIn onClick={() => handleZoomIn()} className={className} />
      <ZoomOut onClick={() => handleZoomOut()} className={className} />
      <Reset onClick={() => handleResetTransform()} className={className} />
    </div>
  );
};

export default LightBoxControls;
