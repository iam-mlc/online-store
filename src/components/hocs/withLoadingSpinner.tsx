import LoadingSpinner from "@/components/LoadingSpinner";
import React, { useState } from "react";
import Image from "next/image";

interface LoadingProps extends React.PropsWithChildren<React.ComponentProps<typeof Image>> {}

interface ComponentProps<T> {
  Component: React.ComponentType<T>;
}

export const withLoadingSpinner = (
  Component: React.ComponentType<LoadingProps>
) => {
  return ({ ...props }: Omit<LoadingProps, keyof ComponentProps<LoadingProps>>) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
      <div className="relative w-full h-full">
        {!imageLoaded && <LoadingSpinner />}
        <Component
          {...props}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    );
  };
};