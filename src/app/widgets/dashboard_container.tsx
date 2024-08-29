"use client";
import { Box, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function DashboardContainer({ children }: Props) {
  const pathname = usePathname();
  return (
    <Box flex={1} padding={{ base: 8, md: 4 }} position={"relative"}>
      <Text
        pt={2}
        mb={8}
        fontSize={{ base: 12, md: "xl" }}
        color={"gray.400"}
        textOverflow={"ellipsis"}
        width={{ base: 320, md: "100%" }}
      >
        {pathname}
      </Text>
      {children}
    </Box>
  );
}
