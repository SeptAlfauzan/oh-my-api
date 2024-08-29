"use client";
import Fetch from "@/helper/fetch";
import FileUpload from "@/widgets/file_upload";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { HttpMethod } from "@prisma/client";
import { editor } from "monaco-editor";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PostPutRequsetBodyFields from "./widgets/post_put_request_body_fields";

export default function Page({ params }: { params: { slug: string } }) {
  const [editorValue, setEditorValue] = useState("");
  const [httpMethod, setHttpMethod] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [desc, setDesc] = useState<string | undefined>(undefined);
  const [enabledButton, setEnabledButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const toast = useToast();

  function handleEditorValidation(markers: editor.IMarker[]) {
    const errorMessages = markers.map((marker) => marker.message);
    console.log(errorMessages);
    setEnabledButton(errorMessages.length == 0);
  }

  function handleOnChangeEditor(value: string | undefined) {
    if (value != undefined) {
      setEditorValue(value);
    }
    updateEnableButton();
  }

  function updateEnableButton() {
    const value =
      httpMethod != undefined &&
      name != undefined &&
      editorValue != "" &&
      desc != "";
    console.log(value);
    console.log(editorValue);
    setEnabledButton(value);
  }

  useEffect(() => {
    const value =
      httpMethod != undefined &&
      name != undefined &&
      editorValue != "" &&
      desc != "";
    console.log(value);
    console.log(editorValue);
    setEnabledButton(value);
  }, [desc, editorValue, httpMethod, name]);

  async function handleUploadJson() {
    setLoading(true);
    try {
      await Fetch.postData("/api/endpoints", {
        workspaceId: params.slug,
        name: name,
        desc: desc,
        jsonstr: editorValue,
        requestType: httpMethod,
      });
      toast({
        title: `New endpoint api successfully created!.`,
        description: `Success create new api endpoint!`,
        status: "info",
        position: "top-right",
        duration: 2000,
        isClosable: true,
        onCloseComplete() {
          router.replace(`/dashboard/workspaces/${params.slug}`);
        },
      });
    } catch (error) {
      const result = (error as Error).message;
      toast({
        title: `Error endpoint api failed to created!.`,
        description: `Error: ${result}`,
        status: "error",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUploadJson();
        }}
      >
        <SimpleGrid
          paddingRight={4}
          columns={{ base: 1, md: 2 }}
          spacingX="40px"
          spacingY="20px"
          paddingBottom={10}
        >
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Your endpoint name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormControl>
          <FormControl width={300}>
            <FormLabel>Request Type</FormLabel>
            <Select
              placeholder="Select request type"
              color={"gray"}
              onChange={(e) => {
                setHttpMethod(e.target.value);
              }}
            >
              <option value={HttpMethod.GET.toString()}>GET</option>
              <option value={HttpMethod.POST.toString()}>POST</option>
              <option value={HttpMethod.PUT.toString()}>PUT</option>
              <option value={HttpMethod.DELETE.toString()}>DELETE</option>
            </Select>
          </FormControl>
          <FormControl>
            <Checkbox colorScheme="gray" defaultChecked size="lg">
              Use Header Authorization
            </Checkbox>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Desc</FormLabel>
            <Textarea
              placeholder="Your endpoint name"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </FormControl>
        </SimpleGrid>

        {(httpMethod as HttpMethod) == HttpMethod.POST ||
        (httpMethod as HttpMethod) == HttpMethod.PUT ? (
          <PostPutRequsetBodyFields
            onUpdate={(value) => console.table(value)}
          />
        ) : (
          <></>
        )}

        <Box display={"flex"} flexDir={"column"} gap={2}>
          <Text>Expected json result</Text>
          <FileUpload
            cbOnReadJsonFile={(fileContent) => {
              setEditorValue(fileContent);
            }}
            name={"json-file"}
            placeholder={"Pick from file"}
            acceptedFileTypes={"application/json"}
          >
            <Text color={"gray"}>Pick from file</Text>
          </FileUpload>
          <Text color={"gray"}>Edit your json</Text>
          <Box height={{ base: "40vh", md: "60vh" }}>
            <Editor
              value={editorValue}
              onChange={handleOnChangeEditor}
              height="100%"
              defaultLanguage="json"
              onValidate={handleEditorValidation}
            />
          </Box>
        </Box>
        <Button
          disabled={loading || !enabledButton}
          type="submit"
          position={"fixed"}
          left={{ base: 8, md: "initial" }}
          bottom={4}
          right={8}
          background={enabledButton ? "teal.200" : "gray.200"}
        >
          <Text>{loading ? "Please wait..." : "Save"}</Text>
        </Button>
      </form>
    </Box>
  );
}
