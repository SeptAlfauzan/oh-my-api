"use client";
import {
  Box,
  Button,
  Text,
  Image,
  Heading,
  Card,
  CardHeader,
  Flex,
  Avatar,
  IconButton,
  CardBody,
  ComponentWithAs,
  IconButtonProps,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Component } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  MdEditDocument,
  MdInterests,
  MdPerson3,
  MdSettings,
  MdShare,
} from "react-icons/md";

export default function Home() {
  return <HomePage />;
}

function HomePage() {
  const router = useRouter();
  return (
    <Box
      px={{ md: "124px", base: 4 }}
      position="relative"
      display="flex"
      flexDir="column"
    >
      <Box
        pt="24px"
        position="sticky"
        width="100%"
        display="flex"
        alignItems={"center"}
        flexDir="row"
        gap={2}
      >
        <Image src="/icons/ohmyapi_ic.png" width={12} height={12} alt="logo" />
        <Text fontWeight="bold">Oh My REST API</Text>
        <Button ml="auto" onClick={() => router.push("/auth")}>
          <Text>Login</Text>
        </Button>
      </Box>
      <BlurBackground />
      <Box display="flex" minHeight="80vh" alignItems="center">
        <Box flex={1}>
          <Heading fontSize={{ md: 52, base: 24 }} fontWeight="bold">
            Oh My REST API: Supercharge your App Development Workflow
          </Heading>
          <Text fontSize={24} mb={12} mt={4}>
            Craft Custom Dummy APIs in Minutes, Not Days
          </Text>
          <Button
            onClick={() => router.push("/register")}
            background="black"
            color="white"
            _hover={{ background: "gray.600", color: "white" }}
          >
            Create new account now
          </Button>
        </Box>
        <Box
          flex={1}
          position="relative"
          display={{ base: "none", md: "block" }}
        >
          <Image
            boxShadow="2xl"
            rounded="lg"
            width={624}
            height={360}
            alt="preview"
            src="https://i.imgur.com/aQYafG5.png"
          />
        </Box>
      </Box>
      <Heading textAlign={"center"} mb={16} fontWeight="light">
        From developer, to developer
      </Heading>
      <Box width={{ base: "100%", md: 620 }} alignSelf={"center"} mb={8}>
        <Heading fontSize={{ md: 52, base: 40 }} textAlign="center">
          Turn API development into better developer outcomes
        </Heading>
        <Text mt={8}>
          Our Dummy API Generator gives development and testing teams a rich,
          always-customizable data foundation and solutions for creating mock
          APIs, accelerating development, and improving collaboration.
        </Text>
      </Box>
      <HighlightedFeatures items={features} />
      <Footer />
    </Box>
  );
}

const features: Item[] = [
  {
    title: "Easy to work together",
    text: "Share your crafted API with your team, streamlining the development process.",
    icon: (
      <Icon
        as={MdShare}
        fontSize={64}
        background={"gray.200"}
        rounded={"xl"}
        padding={4}
      />
    ),
  },
  {
    title: "Interactive client dashboard",
    text: "Instantly test your crafted APIs in our interactive dashboard. See responses in real-time and fine-tune your endpoints effortlessly.",
    icon: (
      <Icon
        as={MdInterests}
        fontSize={64}
        background={"gray.200"}
        rounded={"xl"}
        padding={4}
      />
    ),
  },
  {
    title: "Builtin json editor",
    text: "You can directly edit your json response in client dashboard or you can just drop your json file",
    icon: (
      <Icon
        as={MdEditDocument}
        fontSize={64}
        background={"gray.200"}
        rounded={"xl"}
        padding={4}
      />
    ),
  },
];

function BlurBackground() {
  return (
    <Box position="absolute" display="flex" left={"40%"} top={"25%"}>
      <Box
        borderRadius="50%"
        backgroundColor="blue"
        width="240px"
        height="120px"
        filter={`blur(120px)`}
      ></Box>
      <Box
        borderRadius="50%"
        backgroundColor="red"
        width="240px"
        height="240px"
        filter={`blur(120px)`}
      ></Box>
    </Box>
  );
}

type Item = {
  title: string;
  text: string;
  icon: React.ReactNode;
};
type Props = {
  items: Item[];
};

function HighlightedFeatures({ items }: Props) {
  const router = useRouter();
  return (
    <Box width={"100%"} mt={12}>
      <Box
        gap={4}
        display="flex"
        justifyContent="center"
        alignItems={{ base: "center", md: "stretch" }}
        flexDir={{ base: "column", md: "row" }}
      >
        {items.map((item, index) => (
          <Card maxW="md" key={index}>
            <CardHeader>
              <Flex alignItems="center" gap={4}>
                {item.icon}
                <Heading fontSize={{ md: 24, base: 16 }}>{item.title}</Heading>
              </Flex>
            </CardHeader>
            <CardBody>
              <Text>{item.text}</Text>
            </CardBody>
          </Card>
        ))}
      </Box>
      <Box display="flex" justifyContent="center" mt={12}>
        <Button
          onClick={() => router.push("/dashboard")}
          background="black"
          color="white"
          _hover={{ background: "gray.600", color: "white" }}
        >
          Start explore our platform
        </Button>
      </Box>
    </Box>
  );
}

function Footer() {
  return (
    <Box mt={32} mb={4} display="flex" gap={4} justifyContent="center">
      <Text>&copy; 2024</Text>
      <Text>Built using ♥</Text>
      <Link
        href="https://www.linkedin.com/in/septa-alfauzan-a11a891b0/"
        target="_blank"
      >
        About dev
      </Link>
    </Box>
  );
}
