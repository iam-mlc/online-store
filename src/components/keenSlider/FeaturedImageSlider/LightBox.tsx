import * as React from "react";
import Dialog from "@/components/Dialog/Dialog";
import FullscreenButton from "./Buttons/Fullscreen";
import ImageSliderLightbox from "./ImageSliderLightbox";
import CloseButton from "./Buttons/Close";
import KeenSlider from "@/contexts/KeenSliderContext/KeenSlider";
import { createLightBoxImages } from "../helpers/images";

interface LightBoxProps {
  initialSlide: number;
  images: string[];
  title: string;
}

const LightBox: React.FunctionComponent<LightBoxProps> = ({
  initialSlide,
  images,
  title,
}) => {
  const lightBoxImages = createLightBoxImages(images, title);
  const dialogItems = {
    trigger: {
      label: title,
      component: (
        <div className="flex px-2 items-center">
          <FullscreenButton className="sm:w-[2em] sm:h-[2em] lg:w-[2.5em] lg:h-[2.5em] p-2" />
          <span className="font-bold text-white">Fullscreen</span>
        </div>
      ),
    },
    content: {
      label: title,
      component: (
        <KeenSlider initialSlide={initialSlide} drag={false} rubberband={false}>
          <ImageSliderLightbox items={lightBoxImages} />
        </KeenSlider>
      ),
    },
  };

  return (
    <Dialog
      triggerClassName="absolute inset-3 w-fit h-fit z-50 rounded-lg  backdrop-blur-lg bg-black/[.30]"
      overlayClassName="fixed inset-0 bg-black/30 z-[9999] backdrop-blur-lg"
      contentClassName="w-full h-full z-[9999] fixed inset-0 flex items-center justify-center"
      closeClassName="absolute top-1 left-1 z-[9999] cursor-pointer w-[2.2em] h-auto p-2"
      customCloseElement={<CloseButton />}
      items={dialogItems}
    />
  );
};

export default LightBox;
