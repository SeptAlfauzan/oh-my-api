import {
  ChakraProps,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  name: string;
  placeholder: string;
  acceptedFileTypes: string;
  children: ReactNode;
  props?: ChakraProps;
};
export default function FileUpload({
  name,
  placeholder,
  acceptedFileTypes,
  children,
  props,
}: Props) {
  return (
    <FormControl {...props}>
      <FormLabel htmlFor="writeUpFile">{children}</FormLabel>
      <InputGroup
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={40}
        background={"teal.200"}
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
        <Text>Pick or drag .json file</Text>
      </InputGroup>
    </FormControl>
  );
}
