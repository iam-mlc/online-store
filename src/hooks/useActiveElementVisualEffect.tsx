import updateElementPosition from "@/utils/updateElementPosition";
import { useEffect, useState } from "react";

interface useActiveElementVisualEffectParams {
  parentElement: HTMLElement | null;
  elementWithEffect: HTMLElement | null;
}

export const useActiveElementVisualEffect = ({
  parentElement,
  elementWithEffect,
}: useActiveElementVisualEffectParams) => {
  const [activeElement, setActiveElement] = useState<HTMLElement>();

  useEffect(() => {
    handleVisualEffect();
  }, [window.innerWidth]);
  useEffect(() => {
    handleVisualEffect();
  }, [activeElement]);

  if (parentElement && elementWithEffect) {
    parentElement.classList.forEach((className) => {
      if (!className.includes("relative")) {
        parentElement.classList.add("relative");
      }
    });

    elementWithEffect.classList.forEach((className) => {
      if (!className.includes("absolute")) {
        elementWithEffect.classList.add("absolute");
      }
    });
  }

  const handleVisualEffect = () => {
    if (activeElement && elementWithEffect && parentElement) {
      updateElementPosition({
        elementToUpdate: elementWithEffect,
        referenceElement: activeElement,
        containerElement: parentElement,
      });
    }
  };

  const handleActiveElement = (index: number) => {
    if (parentElement) {
      const childElements = Array.from(parentElement.children) as HTMLElement[];

      setActiveElement(childElements[index]);
    }
  };

  return {
    activeElement,
    handleActiveElement,
  };
};
