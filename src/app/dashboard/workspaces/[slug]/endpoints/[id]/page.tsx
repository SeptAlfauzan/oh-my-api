"use client";
import { useHandlerExecutionAPI } from "@/app/hooks/use_handler_execution_api";
import Fetch from "@/helper/fetch";
import { ApiEndpointOutput } from "@/interfaces";
import DetailEndpointComponent from "@/templates/detail_api_endpoint";
import { copyToClipboard } from "@/utils/copy_clipboard";
import { Box, Button, IconButton, Text, useToast } from "@chakra-ui/react";
import { MdShare } from "react-icons/md";
import useSWR from "swr";

export default function Page({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const [editorData, status, performExecution] = useHandlerExecutionAPI();
  const toast = useToast();
  const { data, error, isLoading } = useSWR<ApiEndpointOutput, Error, any>(
    `/api/endpoints?endpointId=${params.id}`,
    Fetch.getData
  );

  async function handleCopyClipBoard() {
    try {
      await copyToClipboard({
        message: "-",
        value: `${window.location.origin}/api/end-to-end?id=${params.id}`,
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

  async function handleCopyClipBoardSharePage() {
    try {
      await copyToClipboard({
        message: "-",
        value: `${window.location.origin}/share/${params.id}`,
      });
      toast({
        title: "Share page url of this endpoint is successfully copied!.",
        description: "Copy success!!",
        status: "success",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Share page url of this endpoint is failed to copy!.",
        description: "Copy fail!!",
        status: "error",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  async function handleExecuteEndpoint(formValue: Record<string, any>) {
    try {
      await performExecution(params.id, data, formValue);
      toast({
        title: "Executing request sucess.",
        description: `Check the result below}`,
        status: "success",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Executing request failed.",
        description: `Request fail! Error: ${error}`,
        status: "error",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  if (error) return <Text>Failed to load {error.message}</Text>;
  if (isLoading) return <Text>Loading endpoint details...</Text>;

  return (
    <Box>
      <DetailEndpointComponent
        id={params.id}
        status={status}
        data={data}
        editorData={editorData}
        handleCopyClipBoard={handleCopyClipBoard}
        handleExecuteEndpoint={handleExecuteEndpoint}
      />
      <IconButton
        shadow={"xl"}
        background={"orange"}
        position={"fixed"}
        top={4}
        right={4}
        pl={3}
        display={{ base: "block", md: "none" }}
        onClick={handleCopyClipBoardSharePage}
        aria-label="share button"
        icon={<MdShare />}
      />
      <Button
        display={{ md: "block", base: "none" }}
        background={"orange"}
        position={"fixed"}
        bottom={4}
        right={4}
        onClick={handleCopyClipBoardSharePage}
      >
        Share this
      </Button>
    </Box>
  );
}
