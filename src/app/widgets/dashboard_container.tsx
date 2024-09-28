"use client";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { MdChevronLeft } from "react-icons/md";

type Props = {
  children: ReactNode;
};
export default function DashboardContainer({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Box flex={1} padding={4} position={"relative"}>
      <Box display="flex" flexDir="row" gap={2}>
        <IconButton
          background="black"
          color="white"
          icon={<MdChevronLeft />}
          aria-label="back button"
          _hover={{ color: "black", background: "gray.300" }}
          onClick={(_) => router.back()}
        />
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
      </Box>
      {children}
    </Box>
  );
}
