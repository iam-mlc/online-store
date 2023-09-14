// import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";

interface IToastProps extends React.ComponentProps<typeof ToastPrimitive.Root> {
  title?: string;
  content?: string;
  children?: React.ReactNode;
  altText: string;
  hasCloseButton?: boolean;
  titleClassName?: string;
  contentClassName?: string;
  viewportClassName?: string;
}

const Toast: React.FC<IToastProps> = ({
  title,
  content,
  children,
  altText,
  hasCloseButton,
  titleClassName,
  contentClassName,
  viewportClassName,
  open,
  ...props
}) => {
  return (
    <>
      <ToastPrimitive.Root open={open} {...props}>
        {title && (
          <ToastPrimitive.Title className={titleClassName}>
            {title}
          </ToastPrimitive.Title>
        )}
        <ToastPrimitive.Description className={contentClassName}>
          {content}
        </ToastPrimitive.Description>
        {children && (
          <ToastPrimitive.Action altText={altText} asChild>
            {children}
          </ToastPrimitive.Action>
        )}
        {hasCloseButton && (
          <ToastPrimitive.Close aria-label="Close">
            <span aria-hidden>X</span>
          </ToastPrimitive.Close>
        )}
      </ToastPrimitive.Root>
      <Transition
        show={open}
        as={Fragment}
        enter="transition ease-in-out duration-300 transform opacity-100"
        enterFrom="translate-x-full"
        enterTo=" translate-x-0"
        leave="transition ease-in-out duration-300 transform "
        leaveFrom="translate-x-0 opacity-100"
        leaveTo="translate-x-full opacity-0"
      >
        <ToastPrimitive.Viewport className={viewportClassName} />
      </Transition>
    </>
  );
};

export default Toast;
