import { useAttributeObserver } from "@/hooks/useAttributeObserver";
import { useEffect, useState } from "react";

export function useDataStateObserver(
    ref: React.MutableRefObject<HTMLElement | null>
  ) : string {
    const [state, setState] = useState<string | null | undefined>("");
    const [refCurrent, setRefCurrent] = useState<Element | null>(null);

    useEffect(() =>{
      if(ref !== null && ref.current !== null){
        setState(ref.current.getAttribute("data-state"));
        setRefCurrent(ref.current);
      }
    },[refCurrent])


    const handleDataStateChange = (mutationsList: MutationRecord[]) => {

      for (let mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-state"
        ) {
          setState(ref.current?.getAttribute("data-state"));
        }
      }
    };

    useAttributeObserver({
      ref: ref,
      callback: handleDataStateChange,
      attributesToWatch: ["data-state"],
    });

    return state || "";
  }