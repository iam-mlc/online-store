import Thumbnail from "./Buttons/Thumbnail";
import { createThumbnailImages } from "../helpers/images";
import UnorderedList from "@/components/UnorderedList/UnorderedList";

interface ThumbnailsGroupProps {
  currentSlide: number;
  handleSlide: (index: number) => void;
  images: string[];
  title: string;
}

const ThumbnailsGroup: React.FunctionComponent<ThumbnailsGroupProps> = ({
  currentSlide,
  handleSlide,
  images,
  title,
}) => {
  const thumbnailImages = createThumbnailImages(images, title);
  return (
    <>
      <div className="flex flex-row gap-3 lg:justify-center md:justify-center lg:flex-nowrap lg:overflow-auto md:overflow-auto sm:overflow-scroll p-4 scrollbar-hide md:absolute bottom-0 ">
        {thumbnailImages.map((thumbnail, index) => {
          return (
            <div
              className={` rounded-full ${
                currentSlide === index
                  ? "ring-4 ring-black "
                  : "hover:ring-black/[.20] hover:ring-4"
              } transition-all dutarion-200 ease-in-out block p-[0.1em]`}
              key={thumbnail.label + index}
            >
              <Thumbnail
                onClick={(e: any) => {
                  e.preventDefault();
                  handleSlide(index);
                }}
                className={`relative lg:w-full lg:h-full  overflow-hidden rounded-full border-2 border-gray-300 ${
                  currentSlide === index ? "ring-8 ring-transparent" : ""
                } transition-all dutarion-500 ease-in-out block m-auto`}
              >
                <div className=" w-[3em] h-[3em] md:h-[5em] md:w-[5em]">
                  {thumbnail.component}
                </div>
              </Thumbnail>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ThumbnailsGroup;
