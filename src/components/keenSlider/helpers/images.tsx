import { withLoadingSpinner } from "@/components/hocs/withLoadingSpinner";
import NextImage from "next/image";

const Image = withLoadingSpinner(NextImage);

export const createLightBoxImages = (pictures: string[], title: string) =>
  pictures.map((picture, index) => {
    return {
      label: title + index,
      component: (
        <>
          <Image
            width={1000}
            height={1000}
            src={picture}
            alt={title}
            className={`h-full w-full object-contain p-8`}
            loading="lazy"
          />
        </>
      ),
    };
  });
export const createMainImages = (pictures: string[], title: string) =>
  pictures.map((picture, index) => {
    return {
      label: title + index,
      component: (
        <>
          <div className="h-full w-full">
            <Image
              width={800}
              height={800}
              src={picture}
              alt={title}
              className="h-full w-full object-contain bg-black "
              loading="lazy"
            />
          </div>
        </>
      ),
    };
  });

export const createThumbnailImages = (pictures: string[], title: string) =>
  pictures.map((picture: string, index: number) => {
    return {
      label: title + index,
      component: (
        <Image
          src={picture}
          width={200}
          height={200}
          alt={title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      ),
    };
  });
