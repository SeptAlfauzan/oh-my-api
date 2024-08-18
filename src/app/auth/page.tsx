import { Box } from "@chakra-ui/react";
import { cookies } from "next/headers";
import AuthForm from "./widgets/auth_form";

const cookieStore = cookies();

export default function AuthPage() {
  const setCookies = async (key: string, value: string) => {
    "use server"; // mark function as a server action (fixes the error)
    const token = value;
    cookies().set("jwt-token", token, { secure: true });
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
    >
      <AuthForm setCookies={setCookies} />
    </Box>
  );
}
