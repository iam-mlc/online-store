// import * as React from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { withScaleEffect } from "../hocs/withScaleEffect";
interface IDialogTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const Trigger = withScaleEffect(DialogPrimitive.Trigger);

const DialogTrigger: React.FunctionComponent<IDialogTriggerProps> = ({
  children,
  className,
}) => {
  return (
    <>
      <Trigger className={className === undefined ? "" : className}>
        {children}
      </Trigger>
    </>
  );
};

export default DialogTrigger;
