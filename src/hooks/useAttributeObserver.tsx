import { useEffect } from "react";

interface useAttributeObserverParams {
    ref: React.MutableRefObject<HTMLElement | null>;
    callback: (mutationsList: MutationRecord[]) => void;
    attributesToWatch?: string[];
  }

  export function useAttributeObserver({
    ref,
    callback,
    attributesToWatch,
  }: useAttributeObserverParams) {
    useEffect(() => {
      const options: MutationObserverInit = {
        attributes: true,
      };

      if (attributesToWatch !== undefined) {
        options.attributeFilter = attributesToWatch;
      }

      if (ref !== null && ref.current !== null) {
        const observer = new MutationObserver(callback);
        observer.observe(ref.current, options);

        // Clean up the observer on unmounting of the component
        return () => observer.disconnect();
      }
    }, []);
  }