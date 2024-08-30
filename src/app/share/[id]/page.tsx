"use client";
import Fetch from "@/helper/fetch";
import { ApiEndpointOutput } from "@/interfaces";
import DetailEndpointComponent from "@/templates/detail_api_endpoint";
import { copyToClipboard } from "@/utils/copy_clipboard";
import { Box, Heading, Text, useToast } from "@chakra-ui/react";
import { HttpMethod } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

export default function Page({ params }: { params: { id: string } }) {
  const toast = useToast();
  const { data, error, isLoading } = useSWR<ApiEndpointOutput, Error, any>(
    `/api/endpoints?endpointId=${params.id}`,
    Fetch.getData
  );
  const [editorData, setEditorData] = useState<string | null | undefined>(null);
  const [onLoadingExecute, setonLoadingExecute] = useState(false);

  async function handleCopyClipBoard() {
    try {
      await copyToClipboard({
        message: "-",
        value: `http://localhost:3000/api/end-to-end?id=${params.id}`,
      });
      toast({
        title: "End to end endpoint url is copied!.",
        description: "Copy success!!",
        status: "success",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "End to end endpoint url failed to copy!.",
        description: "Copy fail!!",
        status: "error",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  async function handleExecuteEndpoint() {
    setonLoadingExecute(true);
    try {
      let result;
      switch (data?.httpMethod) {
        case HttpMethod.GET:
          result = await Fetch.getDataRaw(
            `http://localhost:3000/api/end-to-end?id=${params.id}`
          );
          break;
        default:
          throw new Error("Other HTTP method is not implemented yet :(");
      }
      if (result) setEditorData(JSON.stringify(result));
    } catch (error) {
      toast({
        title: "Executing request failed.",
        description: "Request fail!",
        status: "error",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setonLoadingExecute(false);
    }
  }

  if (error) return <Text>Failed to load {error.message}</Text>;
  if (isLoading) return <Text>Loading endpoint details...</Text>;

  return (
    <Box minH={"100vh"}>
      <Box px={{ md: 32, base: 12 }} pb={24}>
        <Heading>API: {data?.name}</Heading>
        <Text mb={12}>Desc: {data?.desc}</Text>
        <DetailEndpointComponent
          id={params.id}
          data={data}
          editorData={editorData}
          onLoadingExecute={onLoadingExecute}
          handleCopyClipBoard={handleCopyClipBoard}
          handleExecuteEndpoint={handleExecuteEndpoint}
        />
      </Box>
      <Box
        bottom={4}
        position={"absolute"}
        display={"flex"}
        justifyContent={"center"}
        width={"100vw"}
        gap={2}
      >
        <Text>Created using</Text>
        <Link href={"/"}>
          <Text fontWeight={"bold"}>Oh-My-API 🔥</Text>
        </Link>
      </Box>
    </Box>
  );
}
