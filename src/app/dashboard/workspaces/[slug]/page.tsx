import { EndpointItem, RequestType } from "@/interfaces";
import { Box, Button, List, Link, Text } from "@chakra-ui/react";
import { MdCopyAll } from "react-icons/md";
import WorkspaceEndpointItem from "./widgets/workspace_endpoint_item";

export default function Page({ params }: { params: { slug: string } }) {
  const dummy: EndpointItem[] = [
    {
      id: "woeiuqwe",
      workspaceId: "ioqwiue",
      desc: "singkat saja",
      name: "Paham!",
      lastEdited: "kemarin",
      requestType: RequestType.GET,
    },
    {
      id: "woeiuqwe",
      workspaceId: "ioqwiue",
      desc: "singkat saja",
      name: "Paham!",
      lastEdited: "kemarin",
      requestType: RequestType.POST,
    },
    {
      id: "woeiuqwe",
      workspaceId: "ioqwiue",
      desc: "singkat saja",
      name: "Paham!",
      lastEdited: "kemarin",
      requestType: RequestType.PUT,
    },
    {
      id: "woeiuqwe",
      workspaceId: "ioqwiue",
      desc: "singkat saja",
      name: "Paham!",
      lastEdited: "kemarin",
      requestType: RequestType.DELETE,
    },
  ];

  return (
    <Box>
      <List spacing={3}>
        {dummy.map((item, i) => (
          <WorkspaceEndpointItem key={i} item={item} />
        ))}
      </List>
      <Link
        href={`/dashboard/new-endpoint/${params.slug}`}
        position={"absolute"}
        bottom={4}
        right={4}
      >
        <Button background={"teal.200"}>
          <Text>Create New Endpoint</Text>
        </Button>
      </Link>
    </Box>
  );
}
