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
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdWarning } from "react-icons/md";
import { useRouter } from "next/navigation";
import { JWT_TOKEN_KEY } from "@/constanta";
import Fetch from "@/helper/fetch";
import { url } from "inspector";

export default function AuthForm({
  setCookies,
}: {
  setCookies: (key: string, value: string) => void;
}) {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signinError, setSigninError] = useState("");
  const [onSignin, setOnSignin] = useState(false);

  const signinEmailPassword = async (email: string, password: string) => {
    setOnSignin(true);
    try {
      const result = await Fetch.postData<string>("/api/auth", {
        email: email,
        password: password,
      });

      setCookies(JWT_TOKEN_KEY, result);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setSigninError(`${error}`);
      onOpen();
    } finally {
      setOnSignin(false);
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
        Please signin to your account
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signinEmailPassword(email, password);
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
          <FormControl isRequired>
            <PasswordInput setValue={setPassword} />
          </FormControl>
          <Link
            textAlign={"right"}
            color={"blue"}
            fontSize={"xs"}
            href="/forgot-password"
          >
            Forgot password
          </Link>
          <Button type="submit" disabled={onSignin}>
            {onSignin ? "Signing.." : "Signin"}
          </Button>
          <Text fontSize={"xs"} textAlign={"center"}>
            or
          </Text>
          <GoogleLoginButton
            onSuccess={() => router.push("/dashboard")}
            onFail={setSigninError}
            setCookies={setCookies}
            props={{
              width: "100%",
            }}
          />
        </Stack>
      </form>
    </Box>
  );
}
