"use client";
import { Box, Button, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      height={"100vh"}
      padding={4}
      gap={4}
    >
      <Button alignSelf={"flex-end"} onClick={() => router.push("/auth")}>
        <Text>Login</Text>
      </Button>
      <Box
        width={"100%"}
        height={"80vh"}
        position={"relative"}
        borderRadius={12}
        overflow={"clip"}
        background={"black"}
      >
        <Image
          src="/please_wait.jpg"
          alt="landing"
          layout="fill"
          objectFit="contain"
          priority
        />
      </Box>
      <Text
        paddingX={4}
        background={"black"}
        color={"yellow"}
        display={{ base: "block", md: "none" }}
      >
        Wanna try Oh-My-REST?
      </Text>
      <Text
        paddingX={4}
        background={"black"}
        color={"yellow"}
        display={{ base: "block", md: "none" }}
      >
        Click login button on right corner
      </Text>
    </Box>
  );
}
