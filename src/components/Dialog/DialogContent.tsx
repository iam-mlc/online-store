import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import { withScaleEffect } from "../hocs/withScaleEffect";

interface IDialogContentProps {
  children: React.ReactNode;
  ref: any;
  handleOpen?: () => void;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  overlayClassName?: string;
  closeClassName?: string;
  closeElement?: React.ReactNode;
  dialogTitle?: string;
  dialogDescription?: string;
}

const CloseTrigger = withScaleEffect(DialogPrimitive.Close);

const DialogContent = forwardRef<HTMLDivElement, IDialogContentProps>(
  (
    {
      children,
      contentClassName,
      overlayClassName,
      closeClassName,
      closeElement,
      dialogTitle,
      dialogDescription,
      titleClassName,
      descriptionClassName,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className={
              overlayClassName === undefined
                ? "fixed inset-0 bg-black opacity-30 z-[990]"
                : overlayClassName
            }
          />

          <DialogPrimitive.Content
            {...props}
            ref={ref}
            className={
              contentClassName === undefined
                ? "w-full h-full z-[990] fixed top-0"
                : contentClassName
            }
          >
            {dialogTitle && (
              <DialogPrimitive.Title className={titleClassName}>
                {dialogTitle}
              </DialogPrimitive.Title>
            )}
            {dialogDescription && (
              <DialogPrimitive.Description className={descriptionClassName}>
                {dialogDescription}
              </DialogPrimitive.Description>
            )}
            {children}
            <CloseTrigger
              aria-label="Close"
              className={
                closeClassName === undefined
                  ? "absolute top-[4%] left-[2%] z-[999]"
                  : closeClassName
              }
            >
              {closeElement === undefined ? <CloseIcon /> : closeElement}
            </CloseTrigger>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </>
    );
  }
);

const CloseIcon = () => {
  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      className={"stroke-white opacity-70"}
    >
      <line x1="0" y1="0" x2="100" y2="100" strokeWidth="20" />
      <line x1="100" y1="0" x2="0" y2="100" strokeWidth="20" />
    </svg>
  );
};

export default DialogContent;
