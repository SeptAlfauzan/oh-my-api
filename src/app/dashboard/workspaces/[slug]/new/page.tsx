"use client";
import Fetch from "@/helper/fetch";
import ImageKitHelper from "@/helper/imagekit_helper";
import FileUpload from "@/widgets/file_upload";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { HttpMethod } from "@prisma/client";
import { editor } from "monaco-editor";
import { useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const [editorValue, setEditorValue] = useState("");
  const [httpMethod, setHttpMethod] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [desc, setDesc] = useState<string | undefined>(undefined);
  const [enabledButton, setEnabledButton] = useState(false);

  function handleEditorValidation(markers: editor.IMarker[]) {
    const errorMessages = markers.map((marker) => marker.message);
    console.log(errorMessages);
    setEnabledButton(errorMessages.length == 0);
  }

  function handleOnChangeEditor(value: string | undefined) {
    if (value != undefined) {
      setEditorValue(value);
    }
  }

  async function handleUploadJson() {
    try {
      const res = await Fetch.postData("/api/endpoints", {
        workspaceId: params.slug,
        name: name,
        desc: desc,
        jsonstr: editorValue,
        requestType: httpMethod,
      });
      alert(`sukses upload ${res}`);
      console.log("Upload result:", httpMethod);
    } catch (error) {
      console.error("Upload failed:", error);
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
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl width={300}>
            <FormLabel>Request Type</FormLabel>
            <Select
              placeholder="Select request type"
              color={"gray"}
              onChange={(e) => {
                console.log(e.target.value);
                setHttpMethod(e.target.value);
              }}
            >
              <option value={HttpMethod.GET.toString()}>GET</option>
              <option value={HttpMethod.POST.toString()}>POST</option>
              <option value={HttpMethod.PUT.toString()}>PUT</option>
              <option value={HttpMethod.DELETE.toString()}>DELETE</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Desc</FormLabel>
            <Textarea
              placeholder="Your endpoint name"
              onChange={(e) => setDesc(e.target.value)}
            />
          </FormControl>
        </SimpleGrid>
        {enabledButton ? "aaaa" : "bbbb"}
        <Box display={"flex"} flexDir={"column"} gap={2}>
          <Text>Expected json result</Text>
          <FileUpload
            cbOnReadJsonFile={(fileContent) => setEditorValue(fileContent)}
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
          disabled={
            !(
              name != undefined &&
              desc != undefined &&
              httpMethod != undefined &&
              editorValue != "" &&
              enabledButton == true
            )
          }
          type="submit"
          position={"fixed"}
          left={{ base: 8, md: "initial" }}
          bottom={4}
          right={8}
          background={"teal.200"}
        >
          <Text>Save</Text>
        </Button>
      </form>
    </Box>
  );
}
