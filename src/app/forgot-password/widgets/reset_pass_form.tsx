"use client";
import Fetch from "@/helper/fetch";
import Dialog from "@/widgets/dialog";
import PasswordInput from "@/widgets/password_input";
import {
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdWarning } from "react-icons/md";

export default function ResetPassForm() {
  const router = useRouter();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [onSignup, setOnSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [signinError, setSigninError] = useState("");

  const resetPasswordByEmail = async (email: string) => {
    setOnSignup(true);
    try {
      await Fetch.postData("/api/reset-password", {
        email,
      });
      toast({
        title: `Success send reset password email!.`,
        description: "You will be redirect to login page",
        status: "info",
        position: "top-right",
        duration: 2000,
        isClosable: true,
        onCloseComplete: () => {
          router.replace("/auth");
        },
      });
    } catch (error) {
      console.log(error);
      setSigninError(`${error}`);
      onOpen();
    } finally {
      setOnSignup(false);
    }
  };

  return (
    <Box>
      <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            Error when send reset password email!
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody
            display="flex"
            flexDir="column"
            alignItems={"center"}
          >
            <MdWarning size={48} color="gray" />
            <Text>{signinError}</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>Close</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </Dialog>
      <Heading fontSize={"2xl"} fontWeight={"bold"} mb={4}>
        Fill your email account
      </Heading>
      <Heading fontSize={"1xl"} mb={4}>
        to send reset password email
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          resetPasswordByEmail(email);
        }}
      >
        <Stack spacing={3}>
          <FormControl isRequired>
            <Input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Button type="submit" disabled={onSignup}>
            {onSignup ? "Send reset password email.." : "Send email"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
