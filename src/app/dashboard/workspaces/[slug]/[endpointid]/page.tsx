import { Text } from "@chakra-ui/react";

export default function Page({
  params,
}: {
  params: { slug: string; endpointid: string };
}) {
  return <Text>{params.endpointid}</Text>;
}
