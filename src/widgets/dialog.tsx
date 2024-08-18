import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { ReactNode, RefObject } from "react";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: ReactNode;
};

export default function Dialog({ isOpen, onOpen, onClose, children }: Props) {
  const cancelRef: RefObject<any> = React.useRef();

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      {children}
    </AlertDialog>
  );
}
