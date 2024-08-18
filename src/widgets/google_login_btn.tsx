"use client";
import FirebaseHelper from "@/helper/firebase_helper";
import { Button, ButtonProps, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

type Props = {
  setCookies: (key: string, value: string) => void;
  props: ButtonProps;
};

export default function GoogleLoginButton({ setCookies, props }: Props) {
  const firebaseHelper = FirebaseHelper.getInstance();
  const loginWithGoogle = async () => {
    try {
      const token = await firebaseHelper.googleOAuth();
      setCookies("jwt-token", token.toString());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button onClick={loginWithGoogle} leftIcon={<FcGoogle />} {...props}>
      <Text>Login with Google</Text>
    </Button>
  );
}
