import Image from "next/image";
import * as React from "react";

interface BackgroundImageProps {
  src?: string
  isBlurred?: boolean
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ src, isBlurred }) => {
  return (
    <>
      <div className="absolute w-full h-full top-0 right-0 -z-10 ">
        <Image
          width={2000}
          height={2000}
          alt="style"
          src={src || `/images/homePage/design/12.jpg`}
          className="object-cover w-full h-full"
        />
        <div className={`absolute bg-black/[.80] w-full h-full top-0 left-0 ${isBlurred ? "backdrop-blur-sm" : ""}`}></div>
      </div>
    </>
  );
};

export default BackgroundImage;
