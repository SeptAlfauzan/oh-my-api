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
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaFireAlt } from "react-icons/fa";
import { MdMenu } from "react-icons/md";

type Props = {
  items: SidebarItem[];
};

export default function Sidebar({ items }: Props) {
  const activeItemIndex = 0;
  const [smMenuOn, setSmMenuOn] = useState(false);
  const toggleMenu = () => setSmMenuOn(!smMenuOn);
  const pathname = usePathname();
  const pathnames = pathname.split("/");
  const getFirstOrSecondPathname =
    pathnames.length == 2 ? pathnames[1] : pathnames[2];

  return (
    <Box
      display={{ base: "none", md: "block" }}
      px={4}
      zIndex={10}
      boxShadow={"xs"}
    >
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
                    getFirstOrSecondPathname == e.text.toLowerCase()
                      ? "gray.600"
                      : undefined
                  }
                  color={
                    getFirstOrSecondPathname == e.text.toLowerCase()
                      ? "white"
                      : undefined
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
                    backgroundColor: "gray.600",
                    color: "white",
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
