import { withLoadingSpinner } from "@/components/hocs/withLoadingSpinner";
import BackgroundImage from "@/components/BackgroundImage";
import DescriptionSlider from "@/components/keenSlider/DescriptionSlider";
import ImageSlider from "@/components/keenSlider/ImageSlider";
import KeenSlider from "@/contexts/KeenSliderContext/KeenSlider";
import { BannerDetails } from "@/types/BannerDetails";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

type Picture = {
  title: string;
  thumbnail: string;
};

interface IBannerProps {
  images: Picture[] | Picture | undefined;
  details: BannerDetails[] | BannerDetails | undefined;
  isReversed?: boolean;
}
const Image = withLoadingSpinner(NextImage);

const Banner: React.FunctionComponent<IBannerProps> = ({
  images,
  details,
  isReversed,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowSize();

  const breakpoints = {
    lg: 1024,
    md: 768,
    sm: 480,
    xsm: 280,
  };

  useEffect(() => {
    if (images) {
      setIsLoading(false);
    }
  }, [images, details]);

  return (
    <>
      <div
        className={`relative flex md:h-[30em] h-[40em] overflow-hidden flex-col sm:gap-12 md:gap-0 md:rounded-r-full rounded-b-full md:rounded-bl-none md:flex-row ${
          isReversed ? " md:-scale-x-100" : ""
        } transform`}
      >
        <div
          className={`lg:w-[50%] w-full h-full ${
            isReversed ? ": md:-scale-x-100" : ""
          }`}
        >
          {images ? (
            <>
              {Array.isArray(images) ? (
                <KeenSlider
                  loop={true}
                  canAutoChange={true}
                  renderMode="performance"
                  spacing={5}
                  drag={false}
                  verticalSlides={true}
                  isRTL={isReversed}
                >
                  <ImageSlider
                    items={images}
                    listClassName="h-full"
                    itemClassName="h-full"
                  />
                </KeenSlider>
              ) : (
                <>
                  <Image
                    width={800}
                    height={800}
                    src={images.thumbnail}
                    alt={images.title}
                    className={`h-[40em] object-cover bg-black w-full `}
                    loading="lazy"
                  />
                </>
              )}
            </>
          ) : (
            <div className="h-[40em] md:h-full bg-slate-300 w-full animate-pulse"></div>
          )}
        </div>
        <div className="lg:w-[50%] h-full w-full absolute lg:static text-white lg:text-black z-10">
          {details ? (
            <>
              {Array.isArray(details) ? (
                <KeenSlider
                  loop={true}
                  canAutoChange={true}
                  renderMode="performance"
                  spacing={5}
                  drag={false}
                  isRTL={isReversed}
                >
                  <DescriptionSlider
                    items={details}
                    itemClassName="h-full"
                    listClassName="h-full"
                  />
                </KeenSlider>
              ) : (
                <div
                  className={`relative md:w-[70%] lg:w-full w-full h-[100%] flex flex-col gap-12 lg:p-16 p-8 justify-center md:text-left text-center ${
                    isReversed ? "md:-scale-x-100 md:text-right" : "text-left"
                  } lg:text-white`}
                >
                  <h2 className="lg:text-5xl md:text-4xl text-3xl font-bold">
                    {details.title}
                  </h2>
                  {details.description && (
                    <p className={``}>{details.description}</p>
                  )}
                  <div className="hidden lg:block">
                    <BackgroundImage isBlurred={width < 1024 ? true : false} />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="h-full w-full bg-slate-400 absolute lg:static z-10 animate-pulse flex flex-col justify-center lg:p-16 p-8 gap-12 items-center md:items-start">
              <div className="p-4 bg-black/[.50] w-[90%] rounded-full"></div>
              <div className="p-4 bg-black/[.50] w-[90%] rounded-full"></div>
              <div className="p-4 bg-black/[.50] w-[50%] rounded-full"></div>
            </div>
          )}
        </div>
        <div className="bg-black/[.70] absolute h-full w-full lg:hidden"></div>
      </div>
    </>
  );
};

export default Banner;
