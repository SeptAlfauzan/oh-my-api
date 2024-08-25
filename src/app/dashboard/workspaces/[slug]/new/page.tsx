"use client";
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

  function handleEditorValidation(markers: editor.IMarker[]) {
    markers.forEach((marker) => console.log("onValidate:", marker.message));
  }

  function handleOnChangeEditor(value: string | undefined) {
    if (value != undefined) {
      setEditorValue(value);
    }
  }

  async function handleUploadJson() {
    try {
      const res = await fetch("/api/endpoints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jsonstr: editorValue }),
      });

      console.log("Upload result:", res);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }

  return (
    <Box>
      <Text>{editorValue}</Text>
      <form>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacingX="40px"
          spacingY="20px"
          paddingBottom={10}
        >
          <FormControl isRequired>
            <FormLabel>Name {params.slug}</FormLabel>
            <Input placeholder="Your endpoint name" />
          </FormControl>
          <FormControl>
            <FormLabel>Request Type</FormLabel>
            <Select placeholder="Select request type" color={"gray"}>
              <option value={HttpMethod.GET}>GET</option>
              <option value={HttpMethod.POST}>POST</option>
              <option value={HttpMethod.PUT}>PUT</option>
              <option value={HttpMethod.DELETE}>DELETE</option>
            </Select>
          </FormControl>
          <Box display={"flex"} flexDir={"column"} gap={2}>
            <Text>Expected json result</Text>
            <FileUpload
              name={"json-file"}
              placeholder={"Pick from file"}
              acceptedFileTypes={"application/json"}
            >
              <Text color={"gray"}>Pick from file</Text>
            </FileUpload>
            <Text color={"gray"}>Edit your json</Text>
            <Box height={{ base: "40vh", md: "60vh" }}>
              <Editor
                onChange={handleOnChangeEditor}
                height="100%"
                defaultLanguage="json"
                onValidate={handleEditorValidation}
              />
            </Box>
          </Box>

          <FormControl isRequired>
            <FormLabel>Desc</FormLabel>
            <Textarea placeholder="Your endpoint name" />
          </FormControl>
        </SimpleGrid>
      </form>
      <Button
        onClick={handleUploadJson}
        position={"fixed"}
        left={{ base: 8, md: "initial" }}
        bottom={4}
        right={8}
        background={"teal.200"}
      >
        <Text>Save</Text>
      </Button>
    </Box>
  );
}
