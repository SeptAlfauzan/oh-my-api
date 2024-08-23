"use client";

import Dialog from "@/widgets/dialog";
import GoogleLoginButton from "@/widgets/google_login_btn";
import PasswordInput from "@/widgets/password_input";
import {
  Box,
  Text,
  Input,
  FormControl,
  Stack,
  Button,
  Link,
  useDisclosure,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdWarning } from "react-icons/md";
import { useRouter } from "next/navigation";

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
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      if (!res.ok) {
        const msg = await res.text();
        setSigninError(msg);
        onOpen();
      } else {
        router.push("/auth");
      }
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
      <Text fontSize={"2xl"} fontWeight={"bold"} mb={4}>
        Please signin to your account
      </Text>
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
