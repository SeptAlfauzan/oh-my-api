import { RequestBodyFieldRule } from "@/interfaces";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FieldType } from "@prisma/client";
import { useState, useCallback, useEffect } from "react";

type Props = {
  onUpdate: (value: RequestBodyFieldRule[]) => void;
};

export default function PostPutRequestBodyFields({ onUpdate }: Props) {
  const [fields, setFields] = useState<RequestBodyFieldRule[]>([
    { name: undefined, dataType: undefined },
  ]);

  const addNewFields = useCallback(() => {
    setFields((prevFields) => [
      ...prevFields,
      { name: undefined, dataType: undefined },
    ]);
    // triggerOnUpdate();
    onUpdate(fields);
  }, [fields, onUpdate]);

  const removeFieldsAt = useCallback(
    (indexToRemove: number) => {
      setFields((prevFields) =>
        prevFields.filter((_, index) => index !== indexToRemove)
      );
      // triggerOnUpdate();
      onUpdate(fields);
    },
    [fields, onUpdate]
  );

  const updateFieldsAt = useCallback(
    (field: RequestBodyFieldRule, index: number) => {
      setFields((prevFields) => {
        const newFields = [...prevFields];
        newFields[index] = field;
        return newFields;
      });
      // triggerOnUpdate();
      console.table(fields);
      onUpdate(fields);
    },
    [fields, onUpdate]
  );

  useEffect(() => {
    onUpdate(fields);
    console.table(fields);
  }, [fields, onUpdate]);

  return (
    <Box my={4}>
      <Text color="gray.400">Only for POST and PUT request method</Text>
      <Button onClick={addNewFields} mt={4}>
        Add Request Body Property
      </Button>
      <SimpleGrid flex={1} columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
        {fields.map((field, index) => (
          <FormControl isRequired key={index} display="flex" gap={2}>
            <Input
              placeholder="Field name"
              flex={1}
              value={field.name || ""}
              onChange={(e) => {
                updateFieldsAt({ ...field, name: e.target.value }, index);
              }}
            />
            <Select
              placeholder="Select data type"
              width="180"
              fontSize={12}
              value={field.dataType || ""}
              onChange={(e) => {
                updateFieldsAt(
                  { ...field, dataType: e.target.value as FieldType },
                  index
                );
              }}
            >
              {Object.values(FieldType).map((fieldType) => (
                <option key={fieldType} value={fieldType}>
                  {fieldType}
                </option>
              ))}
            </Select>
            <IconButton
              onClick={() => removeFieldsAt(index)}
              colorScheme="red"
              aria-label="delete request field"
              icon={<CloseIcon />}
            />
          </FormControl>
        ))}
      </SimpleGrid>
    </Box>
  );
}
