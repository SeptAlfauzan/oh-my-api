"use client";
import { SidebarItem } from "@/interfaces";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  IconButton,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React, { MutableRefObject } from "react";
import { FaFireAlt } from "react-icons/fa";
import { MdMenu } from "react-icons/md";

type Props = {
  items: SidebarItem[];
};

export default function Sidebar({ items }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: MutableRefObject<any> = React.useRef();

  const pathname = usePathname();
  const pathnames = pathname.split("/");
  const getFirstOrSecondPathname =
    pathnames.length == 2 ? pathnames[1] : pathnames[2];

  return (
    <>
      <IconButton
        icon={<MdMenu />}
        onClick={onOpen}
        ref={btnRef}
        aria-label={""}
        zIndex={100}
        background={"white"}
        boxShadow={"lg"}
        left={4}
        visibility={{ base: "visible", md: "hidden" }}
        position={"fixed"}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Oh My API</DrawerHeader>
          <DrawerBody>
            <ListItemSideBar
              items={items}
              getFirstOrSecondPathname={getFirstOrSecondPathname}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box
        display={{ base: "none", md: "block" }}
        px={4}
        zIndex={10}
        boxShadow={"xs"}
      >
        <Box
          zIndex={2}
          top={0}
          position={"relative"}
          display={{
            base: "none",
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
            <ListItemSideBar
              items={items}
              getFirstOrSecondPathname={getFirstOrSecondPathname}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

type ListItemSidebarProps = {
  items: SidebarItem[];
  getFirstOrSecondPathname: string;
};

const ListItemSideBar: React.FC<ListItemSidebarProps> = ({
  items,
  getFirstOrSecondPathname,
}) => {
  return (
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
            borderRadius={12}
            paddingX={8}
            paddingY={4}
            onClick={() => e.onClick()}
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
  );
};
