"use client";

import {
  Card,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
export default function Dashboard() {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
      <Card padding={4}>
        <Stat>
          <StatLabel>Number of workspaces</StatLabel>
          <StatNumber fontSize={"4xl"}>1</StatNumber>
          <StatHelpText fontSize={12}>Latest workspaces created</StatHelpText>
          <StatHelpText fontSize={12}>12 Feb 2027</StatHelpText>
        </Stat>
      </Card>
      <Card padding={4}>
        <Stat>
          <StatLabel>Number of workspaces</StatLabel>
          <StatNumber fontSize={"4xl"}>1</StatNumber>
          <StatHelpText fontSize={12}>Latest workspaces created</StatHelpText>
          <StatHelpText fontSize={12}>12 Feb 2027</StatHelpText>
        </Stat>
      </Card>
    </SimpleGrid>
  );
}
