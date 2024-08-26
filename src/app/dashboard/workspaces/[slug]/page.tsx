"use client";
import { EndpointItem } from "@/interfaces";
import { Box, Button, List, Link, Text } from "@chakra-ui/react";
import WorkspaceEndpointItem from "./widgets/workspace_endpoint_item";
import useSWR from "swr";
import Fetch from "@/helper/fetch";

export default function Page({ params }: { params: { slug: string } }) {
  const { data, error, isLoading } = useSWR<EndpointItem[], Error, any>(
    `/api/endpoints?workspaceId=${params.slug}`,
    Fetch.getData
  );

  if (error) return <Text>Failed to load {error.message}</Text>;
  if (isLoading) return <Text>Loading...</Text>;

  const items = data ?? [];
  return (
    <Box>
      <List spacing={3}>
        {items.length == 0 ? (
          <Text>No API endpoint has created yet</Text>
        ) : (
          items.map((item, i) => <WorkspaceEndpointItem key={i} item={item} />)
        )}
      </List>
      <Link
        href={`/dashboard/workspaces/${params.slug}/new`}
        position={"absolute"}
        bottom={4}
        right={4}
      >
        <Button
          color={"white"}
          _hover={{
            textColor: "black",
            background: "gray.200",
          }}
          background={"gray.700"}
          position={"fixed"}
          zIndex={2}
          bottom={4}
          right={4}
        >
          <Text>Create New Endpoint</Text>
        </Button>
      </Link>
    </Box>
  );
}
