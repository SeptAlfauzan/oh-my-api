import { EndpointItem } from "@/interfaces";
import { Box, Button, List, Link, Text } from "@chakra-ui/react";
import { MdCopyAll } from "react-icons/md";
import WorkspaceEndpointItem from "./widgets/workspace_endpoint_item";
import { HttpMethod } from "@prisma/client";

export default function Page({ params }: { params: { slug: string } }) {
  const dummy: EndpointItem[] = [
    {
      id: "woeiuqwe",
      workspaceId: "ioqwiue",
      desc: "singkat saja",
      name: "Paham!",
      url: `/dashboard/workspaces/${params.slug}/items/`,
      lastEdited: "kemarin",
      requestType: HttpMethod.GET,
    },
    {
      id: "woeiuqwe",
      workspaceId: "ioqwiue",
      desc: "singkat saja",
      name: "Paham!",
      url: `/dashboard/workspaces/${params.slug}/items/`,
      lastEdited: "kemarin",
      requestType: HttpMethod.POST,
    },
    {
      id: "woeiuqwe",
      workspaceId: "ioqwiue",
      desc: "singkat saja",
      name: "Paham!",
      url: `/dashboard/workspaces/${params.slug}/items/`,
      lastEdited: "kemarin",
      requestType: HttpMethod.PUT,
    },
    {
      id: "woeiuqwe",
      workspaceId: "ioqwiue",
      desc: "singkat saja",
      name: "Paham!",
      url: `/dashboard/workspaces/${params.slug}/items/`,
      lastEdited: "kemarin",
      requestType: HttpMethod.DELETE,
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
        href={`/dashboard/workspaces/${params.slug}/new`}
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
