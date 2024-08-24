"use client";
import Dialog from "@/widgets/dialog";
import {
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Box,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { MdWarning } from "react-icons/md";
import DashboardContainer from "../widgets/dashboard_container";
import DashboardSidebar from "./dashboard_sidebar";

type Props = {
  children: ReactNode;
};
export default function DashboardTemplate({ children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [signoutError, setSignoutError] = useState("");

  return (
    <Box display={"flex"} background={"gray.50"} minHeight={"100vh"} gap={10}>
      <DashboardSidebar
        onSignoutError={(message) => {
          setSignoutError(message);
          onOpen();
        }}
      />
      <DashboardContainer>{children}</DashboardContainer>

      <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>Error when signout</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody
            display="flex"
            flexDir="column"
            alignItems={"center"}
          >
            <MdWarning size={48} color="gray" />
            <Text>{signoutError}</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>Close</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </Dialog>
    </Box>
  );
}
