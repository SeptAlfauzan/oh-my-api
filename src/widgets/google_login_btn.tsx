"use client";
import { JWT_TOKEN_KEY } from "@/constanta";
import FirebaseHelper from "@/helper/firebase_helper";
import { Button, ButtonProps, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

type Props = {
  setCookies: (key: string, value: string) => void;
  onSuccess: () => void;
  onFail: (arg: string) => void;
  props: ButtonProps;
};

export default function GoogleLoginButton({
  setCookies,
  onSuccess,
  onFail,
  props,
}: Props) {
  const firebaseHelper = FirebaseHelper.getInstance();
  const loginWithGoogle = async () => {
    try {
      const user = await firebaseHelper.googleOAuth();
      const token = await user.getIdToken(true);
      await fetch("/api/oauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firebaseUser: user, token: token }),
      });
      onSuccess();
      console.log("SUKSES");
    } catch (error) {
      alert(error);
      onFail(`${error}`);
    }
  };
  return (
    <Button onClick={loginWithGoogle} leftIcon={<FcGoogle />} {...props}>
      <Text>Login with Google</Text>
    </Button>
  );
}
