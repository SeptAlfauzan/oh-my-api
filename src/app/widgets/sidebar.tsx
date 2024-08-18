"use client";
import { Box, List, ListItem, Text } from "@chakra-ui/react";
import { FaFireAlt } from "react-icons/fa";
import { SidebarItem } from "@/interfaces";

type Props = {
  activeItemIndex: number;
  items: SidebarItem[];
};

export default function Sidebar({ items, activeItemIndex }: Props) {
  return (
    <Box width={{ lg: 360 }} paddingLeft={4}>
      <Box paddingX={8} display={"flex"} alignItems={"center"} gap={2}>
        <FaFireAlt size={48} color="orange" />
        <Text fontWeight={"bold"} fontSize={"xl"}>
          Oh-My-API Dashboard
        </Text>
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
              backgroundColor={activeItemIndex == i ? "teal.100" : undefined}
              key={i}
              onClick={e.onClick}
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
  );
}
