import { Box, Text } from "@chakra-ui/react";
import RegisterForm from "./widgets/register_form";
import { cookies } from "next/headers";
import Link from "next/link";
import { JWT_TOKEN_KEY } from "@/constanta";

export default function Page() {
  const setCookies = async (key: string, value: string) => {
    "use server"; // mark function as a server action (fixes the error)
    const token = value;
    cookies().set(JWT_TOKEN_KEY, token, { secure: true });
  };

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
    >
      <RegisterForm setCookies={setCookies} />
      <Link href={"/auth"}>
        <Text mt={10}>Login to account</Text>
      </Link>
    </Box>
  );
}
