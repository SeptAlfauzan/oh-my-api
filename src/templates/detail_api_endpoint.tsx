import { HEADER_AUTHORIZATION_FIELD } from "@/constanta";
import { ApiEndpointOutput, RequestBodyRuleOutput } from "@/interfaces";
import EndpointUrl from "@/widgets/endpoint_url";
import JsonResponseAPI from "@/widgets/json_response_api";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FieldType, HttpMethod } from "@prisma/client";
import { Field, FieldProps, Form, Formik } from "formik";

type Props = {
  id: string;
  data: ApiEndpointOutput | undefined;
  editorData: string | null | undefined;
  status: number;
  handleCopyClipBoard: () => Promise<void>;
  handleExecuteEndpoint: (data: Record<string, any>) => Promise<void>;
};

const DetailEndpointComponent: React.FC<Props> = ({
  id,
  data,
  editorData,
  status,
  handleCopyClipBoard,
  handleExecuteEndpoint,
}) => {
  const transformFieldTypeDefaultValue = (fieldType: FieldType) => {
    switch (fieldType) {
      case FieldType.BOOLEAN:
        return false;
      case FieldType.TEXT:
        return null;
      case FieldType.INTEGER:
        return 0;
      case FieldType.DOUBLE:
        return 0.0;
    }
  };

  const transformRequestBodyRules = (rules: RequestBodyRuleOutput[] = []) => {
    return rules.reduce((acc, rule) => {
      acc[rule.field_name] = transformFieldTypeDefaultValue(rule.field_type);
      return acc;
    }, {} as Record<string, any>);
  };

  const initialValues = transformRequestBodyRules(data?.requestBodyRules);

  return (
    <Box mb={{ base: 10, md: 0 }}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          console.log("formik", JSON.stringify(values, null, 2));
          await handleExecuteEndpoint(values);
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting, values }) => (
          <Form>
            <Box display={"flex"} flexDir={"column"} gap={4}>
              <Box background={"gray.50"} rounded={"md"} p={2}>
                {data?.useAuthorization ? (
                  <Field name={HEADER_AUTHORIZATION_FIELD}>
                    {({ field, form }: FieldProps<any>) => (
                      <FormControl isRequired={true}>
                        <FormLabel>Header Authorization</FormLabel>
                        <Input
                          placeholder={"header authorization token"}
                          type={"text"}
                          {...field}
                        />
                      </FormControl>
                    )}
                  </Field>
                ) : null}

                {data?.requestBodyRules.length != undefined &&
                data?.requestBodyRules.length > 0 ? (
                  <Text my={4}>Request body</Text>
                ) : null}
                <SimpleGrid columns={{ md: 4, sm: 2, base: 1 }} spacing={4}>
                  {data?.requestBodyRules.map((rule, index) => (
                    <Field key={index} name={rule.field_name}>
                      {({ field, form }: FieldProps<any>) => (
                        <FormControl
                          isInvalid={
                            !!(
                              form.errors[rule.field_name] &&
                              form.touched[rule.field_name]
                            )
                          }
                        >
                          <FormLabel
                            htmlFor={rule.field_name}
                            display="flex"
                            alignItems={"center"}
                            gap={2}
                          >
                            {rule.field_name}{" "}
                            <Text color="gray.400" fontSize={12}>
                              [input type: {rule.field_type}]
                            </Text>
                          </FormLabel>
                          {rule.field_type === FieldType.BOOLEAN ? (
                            <Checkbox {...field} id={rule.field_name}>
                              {rule.field_name}
                            </Checkbox>
                          ) : (
                            <Input
                              id={rule.field_name}
                              placeholder={rule.field_name}
                              type={inputTypeFromEndpointFieldType(
                                rule.field_type
                              )}
                              {...field}
                            />
                          )}
                          <FormErrorMessage>
                            {form.errors[rule.field_name] as string}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  ))}
                </SimpleGrid>
              </Box>
              <EndpointUrl
                data={data}
                handleCopyClipBoard={handleCopyClipBoard}
                colorRequestMethod={getRequestTypeColor(data)}
                id={id}
              />
              <JsonResponseAPI
                status={status}
                data={data}
                editorData={editorData}
              />
              <Button
                width={{ md: 320, base: "auto" }}
                mt={10}
                type="submit"
                disabled={isSubmitting}
                background={"black"}
                color={"white"}
                _hover={{
                  color: "black",
                  background: "gray.100",
                }}
              >
                {isSubmitting ? "Loading..." : "Execute endpoint"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

type InputObject = {
  [key: string]: string;
};

type OutputObject = {
  [key: string]: any;
};

const inputTypeFromEndpointFieldType = (fieldType: FieldType): string => {
  switch (fieldType) {
    case FieldType.DOUBLE:
      return "number";
    case FieldType.INTEGER:
      return "number";
    case FieldType.TEXT:
      return "text";
    case FieldType.FILE:
      return "file";
    default:
      return "text";
  }
};

const getRequestTypeColor = (
  endpoint: ApiEndpointOutput | undefined
): string => {
  switch (endpoint?.httpMethod) {
    case HttpMethod.GET:
      return "green.400";
    case HttpMethod.POST:
      return "orange.400";
    case HttpMethod.PUT:
      return "blue.400";
    case HttpMethod.DELETE:
      return "red.400";
    default:
      return "gray.200";
  }
};

export default DetailEndpointComponent;
