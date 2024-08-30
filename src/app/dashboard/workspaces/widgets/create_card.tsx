"use client";
import { Box, Card, Text } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
type Props = {
  onClick: () => void;
};
export default function CreateCard({ onClick }: Props) {
  return (
    <Card
      onClick={onClick}
      position={"relative"}
      overflow={"clip"}
      role="group"
    >
      <Box padding={4} zIndex={2}>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          Create new workspace
        </Text>
        <Text fontSize={12}>Click this card to create new workspace</Text>
      </Box>
      <Box
        background={"orange"}
        position={"absolute"}
        borderRadius={100}
        width={40}
        height={40}
        top={"-40%"}
        right={"-20%"}
        _groupHover={{
          width: 1000,
          height: 1000,
          transition: "1s",
          cursor: "pointer",
        }}
      ></Box>
      <Box top={0} right={0} position={"absolute"}>
        <MdAdd size={52} />
      </Box>
    </Card>
  );
}
