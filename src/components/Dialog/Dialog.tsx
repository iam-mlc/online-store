import * as React from "react";
import DialogContent from "./DialogContent";
import DialogTrigger from "./DialogTrigger";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { TriggerAndContent } from "@/types/TriggerAndContent";

interface IDialogProps {
  contentClassName?: string;
  overlayClassName?: string;
  closeClassName?: string;
  triggerClassName?: string;
  customCloseElement?: React.ReactNode;
  handleClose?: () => void;
  items?: TriggerAndContent;
  isOpen?: boolean;
  onOpenChange?(open: boolean): void;
  defaultOpen?: boolean;
  dialogTitle?: string;
  dialogDescription?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const Dialog: React.FunctionComponent<IDialogProps> = ({
  contentClassName,
  overlayClassName,
  closeClassName,
  triggerClassName,
  customCloseElement,
  dialogTitle,
  dialogDescription,
  titleClassName,
  descriptionClassName,
  items,
}) => {
  return (
    <DialogPrimitive.Root>
      <DialogTrigger className={triggerClassName}>
        {items?.trigger.component}
      </DialogTrigger>
      <DialogContent
        contentClassName={contentClassName}
        overlayClassName={overlayClassName}
        closeClassName={closeClassName}
        closeElement={customCloseElement}
        dialogTitle={dialogTitle}
        dialogDescription={dialogDescription}
        titleClassName={titleClassName}
        descriptionClassName={descriptionClassName}
      >
        {items?.content.component}
      </DialogContent>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
