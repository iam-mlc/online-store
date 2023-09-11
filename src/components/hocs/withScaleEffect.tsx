import React, { useState } from "react";

export interface ScaleEffectProps
  extends React.HTMLAttributes<HTMLElement>,
    React.ButtonHTMLAttributes<HTMLElement> {}

export const withScaleEffect = (
  Component: React.ComponentType<ScaleEffectProps>
) => {
  return (props: ScaleEffectProps) => {
    const [clicked, setClicked] = useState(false);

    return (
      <Component
        {...props}
        className={`${props.className} ${
          clicked ? "scale-[0.7]" : "scale-[1]"
        } transition-all duration-100 ease-in-out transform `}
        onMouseDown={(e) => {
          setClicked(true);
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
          setClicked(false);
        }}
        onTouchStart={(e) => {
          setClicked(true);
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          setClicked(false);
        }}
        onMouseLeave={(e) => {
          setClicked(false);
        }}
      >
        {props.children}
      </Component>
    );
  };
};
