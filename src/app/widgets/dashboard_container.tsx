import { Box, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function DashboardContainer({ children }: Props) {
  const pathname = usePathname();
  return (
    <Box flex={1}>
      <Text pt={2} mb={8} fontSize={"xl"} color={"gray.400"}>
        {pathname}
      </Text>
      {children}
    </Box>
  );
}
