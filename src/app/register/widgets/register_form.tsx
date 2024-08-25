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
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdWarning } from "react-icons/md";

export default function RegisterForm({
  setCookies,
}: {
  setCookies: (key: string, value: string) => void;
}) {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [signinError, setSigninError] = useState("");
  const [onSignup, setOnSignup] = useState(false);

  const signupEmailPassword = async (email: string, password: string) => {
    setOnSignup(true);
    try {
      await Fetch.postData("/api/signup", {
        username: username,
        email: email,
        password: password,
      });

      router.push("/auth");
    } catch (error) {
      console.log(error);
      setSigninError(`${error}`);
    } finally {
      setOnSignup(false);
    }
  };

  return (
    <Box>
      <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>Error when signin</AlertDialogHeader>
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
        Fill textfields below
      </Heading>
      <Heading fontSize={"1xl"} mb={4}>
        to register your new account
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signupEmailPassword(email, password);
        }}
      >
        <Stack spacing={3}>
          <FormControl isRequired>
            <Input
              placeholder="Username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <Input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <PasswordInput setValue={setPassword} />
          </FormControl>
          <Button type="submit" disabled={onSignup}>
            {onSignup ? "Signup.." : "Signup"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
