"use client";
import { SidebarItem } from "@/interfaces";
import {
  Box,
  Heading,
  IconButton,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaFireAlt } from "react-icons/fa";
import { MdMenu } from "react-icons/md";

type Props = {
  activeItemIndex: number;
  items: SidebarItem[];
};

export default function Sidebar({ items, activeItemIndex }: Props) {
  const [smMenuOn, setSmMenuOn] = useState(false);
  const toggleMenu = () => setSmMenuOn(!smMenuOn);
  return (
    <Box position={{ base: "absolute", md: "relative" }} pl={4}>
      <IconButton
        icon={<MdMenu />}
        onClick={toggleMenu}
        aria-label={""}
        zIndex={3}
        alignItems={"center"}
        display={{ base: "block", md: "none" }}
      />
      <Box
        zIndex={2}
        top={0}
        position={{
          base: !smMenuOn ? "relative" : "absolute",
          md: "relative",
        }}
        display={{
          base: !smMenuOn ? "none" : "flex",
          md: "flex",
        }}
      >
        <Box
          backgroundColor={{ base: "background", md: "transparent" }}
          height={"100vh"}
        >
          <Box
            paddingX={8}
            display={"flex"}
            paddingTop={4}
            alignItems={"center"}
            gap={2}
            mb={4}
          >
            <FaFireAlt size={48} color="orange" />
            <Heading fontWeight={"bold"} fontSize={"xl"}>
              Oh-My-API Dashboard
            </Heading>
          </Box>
          <List spacing={2}>
            {items.map((e, i) =>
              e.isSeparator ? (
                <ListItem key={i} paddingX={8} paddingBottom={4} paddingTop={8}>
                  <Text color={"grey"} fontSize={"lg"}>
                    {e.text}
                  </Text>
                </ListItem>
              ) : (
                <ListItem
                  backgroundColor={
                    activeItemIndex == i ? "teal.100" : undefined
                  }
                  key={i}
                  onClick={() => {
                    setSmMenuOn(false);
                    e.onClick();
                  }}
                  borderRadius={12}
                  paddingX={8}
                  paddingY={4}
                  _hover={{
                    cursor: "pointer",
                    backgroundColor: "teal.100",
                  }}
                  display={"flex"}
                  gap={2}
                >
                  {e.icon}
                  <Text>{e.text}</Text>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Box>
    </Box>
  );
}
