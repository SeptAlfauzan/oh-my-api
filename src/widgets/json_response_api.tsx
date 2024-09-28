import { ApiEndpointOutput } from "@/interfaces";
import { Box, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";

type PropsJsonResponseAPI = {
  status: number;
  editorData: string | undefined | null;
  data: ApiEndpointOutput | undefined;
};
export default function JsonResponseAPI({
  editorData,
  status,
  data,
}: PropsJsonResponseAPI) {
  return (
    <Box
      display={"flex"}
      gap={4}
      flex={1}
      position={"relative"}
      flexDir={{ base: "column", md: "row" }}
    >
      <Box>
        <Text>Status Code</Text>
        <Text fontWeight={"bold"} color={status == 200 ? "green" : "red"}>
          {status}
        </Text>
      </Box>

      <Box height={300} flex={1}>
        <Text>Response</Text>
        <Box
          rounded={"lg"}
          width={"100%"}
          height={{ base: 300, md: "100%" }}
          overflow={"clip"}
        >
          <Editor
            theme="vs-dark"
            options={{
              readOnly: true,
            }}
            onMount={(e) => e.getAction("editor.action.formatDocument")?.run()}
            value={editorData || JSON.stringify(data?.jsonResponse)}
            defaultLanguage="json"
          />
        </Box>
      </Box>
    </Box>
  );
}
