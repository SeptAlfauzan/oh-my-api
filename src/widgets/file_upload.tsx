import {
  ChakraProps,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, ReactNode, useState } from "react";
import fs from "fs";

type Props = {
  name: string;
  placeholder: string;
  acceptedFileTypes: string;
  cbOnReadJsonFile: (value: string) => void;
  children: ReactNode;
  props?: ChakraProps;
};
export default function FileUpload({
  name,
  placeholder,
  acceptedFileTypes,
  cbOnReadJsonFile,
  children,
  props,
}: Props) {
  const [fileName, setFileName] = useState("Pick or drag .json file");
  const [noFile, setNoFile] = useState(true);

  function readFileContent(file: File, cbOnFinish: (value: string) => void) {
    const read = new FileReader();
    read.readAsText(file);
    read.onloadend = function () {
      if (read.result) cbOnFinish(read.result.toString());
    };
  }

  return (
    <FormControl {...props}>
      <FormLabel htmlFor="writeUpFile">{children}</FormLabel>
      <InputGroup
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const element: HTMLInputElement = e.target;
          const file = element.files?.item(0);

          if (file) {
            setFileName(file.name);
            setNoFile(false);
            readFileContent(file, cbOnReadJsonFile);
          } else {
            setFileName("Pick or drag .json file");
            setNoFile(true);
          }
        }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={40}
        background={noFile ? "gray.100" : "teal.200"}
        borderRadius={12}
      >
        <Input
          width={"100%"}
          height={"100%"}
          opacity={0}
          position={"absolute"}
          accept={acceptedFileTypes}
          name={name}
          type="file"
        />
        <Text>{fileName}</Text>
      </InputGroup>
    </FormControl>
  );
}
