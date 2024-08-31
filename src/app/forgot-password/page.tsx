import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import ResetPassForm from "./widgets/reset_pass_form";

export default function Page() {
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
    >
      <ResetPassForm />
      <Link href={"/auth"}>
        <Text mt={10}>Login to account</Text>
      </Link>
    </Box>
  );
}
