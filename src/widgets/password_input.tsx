"use client";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";

type Props = {
  setValue: (value: string) => void;
};

export default function PasswordInput({ setValue }: Props) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        onChange={(e) => setValue(e.target.value)}
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
