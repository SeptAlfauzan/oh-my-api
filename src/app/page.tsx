"use client";
import { Box, Button, Text, Image, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  return <HomePage/>
}


function HomePage(){
  const router = useRouter();
  return (
    <Box px={{md: '124px', base: 4}} position="relative" display="flex" flexDir="column">
      <Box pt="24px" position="sticky" width="100%" display="flex" flexDir="row">
        <Text fontWeight="bold">Oh My REST API</Text>
        <Button ml="auto" onClick={() => router.push("/auth")}>
          <Text>Login</Text>
        </Button>
      </Box>
      <BlurBackground/>
      <Box display="flex" minHeight="80vh" alignItems="center">
        <Box flex={1}>
          <Heading fontSize={52} fontWeight="bold">
              Oh My REST API: Supercharge your App Development Workflow
          </Heading>
           <Text fontSize={24} mb={12} mt={4}>
            Craft Custom Dummy APIs in Minutes, Not Days
          </Text>
          <Button onClick={() => router.push("/register")} background="black" color="white" _hover={{background: "gray.600", color: "white"}}>Create new account now</Button>
        </Box>
        <Box flex={1} position="relative">
          <Image boxShadow="2xl" rounded="lg" width={624} height={360} alt="preview" src="https://i.imgur.com/aQYafG5.png"/>
          </Box>
        </Box>
      </Box>
  );
}

function BlurBackground(){
  return (
          <Box position="absolute" display="flex" left={"40%"} top={"25%"}>
            <Box borderRadius="50%" backgroundColor="blue" width="240px" height="120px" filter={`blur(120px)`}></Box>
            <Box borderRadius="50%" backgroundColor="red" width="240px" height="240px" filter={`blur(120px)`}></Box>
          </Box>
         );
}
