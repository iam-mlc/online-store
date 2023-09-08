// import * as React from 'react';
import * as RadixAvatar from "@radix-ui/react-avatar";
import getFirstLetters from "@/utils/getFirstLetters";
import {
  fromCamelCaseToHyphens,
  fromCamelCaseToSpaces,
} from "@/utils/fromCamelCaseConverters";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

interface IAvatarProps {
  img?: string;
  text?: string;
  dimensions: number
  hasOutline?: boolean
}

const Avatar: React.FunctionComponent<IAvatarProps> = ({ img, text, dimensions, hasOutline }) => {
  if(img === undefined || text === undefined){
    return <Loading dimensions={dimensions}/>
  }
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <RadixAvatar.Root className={`inline-flex h-[${dimensions}px] w-[${dimensions}px] select-none items-center justify-center overflow-hidden rounded-full align-middle ${hasOutline ? `outline-4 outline-black/[.80] outline outline-offset-4` : ''}`}>
        <RadixAvatar.Image
          src={img}
          className="h-full w-full rounded-[inherit] object-cover"
          loading="lazy"
        />
        <RadixAvatar.Fallback className="text-black flex h-full w-full items-center justify-center bg-gray-300 text-[1em] font-medium">
          {getFirstLetters(text)}
        </RadixAvatar.Fallback>
      </RadixAvatar.Root>
      <div className="w-[12ch] truncate">
        <span className="">{capitalizeFirstLetter(text)}</span>
      </div>
    </div>
  );
};

const Loading = ({dimensions} : {dimensions : number}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 animate-pulse">
    <div className={`inline-flex h-[${dimensions}px] w-[${dimensions}px] select-none items-center justify-center overflow-hidden rounded-full align-middle`}>
      <div className="h-full w-full rounded-[inherit] bg-gray-200"></div>
    </div>
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="w-16 p-2 bg-gray-200"></div>
    </div>
  </div>
  );
};
export default Avatar;
