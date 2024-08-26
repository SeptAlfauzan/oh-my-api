"use client";

import Fetch from "@/helper/fetch";
import { DashboardClientItem } from "@/interfaces";
import {
  Card,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import useSWR from "swr";
export default function Dashboard() {
  const { data, error, isLoading } = useSWR<DashboardClientItem, Error, any>(
    "/api/dashboard",
    Fetch.getData
  );
  if (error) return <Text>Error: {error.message}</Text>;
  if (isLoading) return <Text>Loading...</Text>;
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
      <Card padding={4}>
        <Stat>
          <StatLabel>Number of workspaces</StatLabel>
          <StatNumber fontSize={"4xl"}>{data?.workspaces_count}</StatNumber>
          <StatHelpText fontSize={12} textAlign={"right"}>
            Latest workspace created
          </StatHelpText>
          <StatHelpText fontSize={12} textAlign={"right"}>
            {data?.last_workspace_created}
          </StatHelpText>
        </Stat>
      </Card>
      <Card padding={4}>
        <Stat>
          <StatLabel>Number of api endpoints</StatLabel>
          <StatNumber fontSize={"4xl"}>{data?.endpoints_count}</StatNumber>
          <StatHelpText fontSize={12} textAlign={"right"}>
            Latest api endpoint created
          </StatHelpText>
          <StatHelpText fontSize={12} textAlign={"right"}>
            {data?.last_endpoint_created}
          </StatHelpText>
        </Stat>
      </Card>
    </SimpleGrid>
  );
}
