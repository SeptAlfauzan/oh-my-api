import { Box, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function DashboardContainer({ children }: Props) {
  return (
    <Box flex={1}>
      <Text pt={2} mb={8} fontSize={"xl"} color={"gray.400"}>
        Pages/Dashboard
      </Text>
      {children}
    </Box>
  );
}
