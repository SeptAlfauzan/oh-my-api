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
} from "@chakra-ui/react";
import { RequestBodyFieldRule } from "@/interfaces";
import { HttpMethod } from "@prisma/client";
import { editor } from "monaco-editor";
import PostPutRequsetBodyFields from "../widgets/post_put_request_body_fields";
import FileUpload from "@/widgets/file_upload";
import { Editor } from "@monaco-editor/react";
import { useRef } from "react";

type Props = {
  handleUploadJson: () => Promise<void>;
  setName: (val: string) => void;
  setHttpMethod: (val: string | undefined) => void;
  setDesc: (val: string) => void;
  setFields: (val: RequestBodyFieldRule[]) => void;
  setEditorValue: (val: string) => void;
  setUseHeaderAuthorization: (val: boolean) => void;
  handleOnChangeEditor: (val: string | undefined) => void;
  handleEditorValidation: (markers: editor.IMarker[]) => void;
  httpMethod: string | undefined;
  editorValue: string;
  loading: boolean;
  enabledButton: boolean;
};
export default function NewEndpointForm({
  handleUploadJson,
  setName,
  setHttpMethod,
  setDesc,
  httpMethod,
  setUseHeaderAuthorization,
  setFields,
  setEditorValue,
  editorValue,
  handleOnChangeEditor,
  handleEditorValidation,
  loading,
  enabledButton,
}: Props) {
  const editorRef = useRef();
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
              {Object.values(HttpMethod).map((httpMethod) => (
                <option key={httpMethod} value={httpMethod}>
                  {httpMethod}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Checkbox
              colorScheme="gray"
              size="lg"
              onChange={(e) => {
                // console.log(e.target.checked);
                setUseHeaderAuthorization(e.target.checked);
              }}
            >
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
          <PostPutRequsetBodyFields onUpdate={(value) => setFields(value)} />
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
              onMount={(e) =>
                e.getAction("editor.action.formatDocument")?.run()
              }
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
