"use client";
import Fetch from "@/helper/fetch";
import { RequestBodyFieldRule } from "@/interfaces";
import { useToast } from "@chakra-ui/react";
import { editor } from "monaco-editor";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NewEndpointForm from "./templates/new_endpoint_form";

export default function Page({ params }: { params: { slug: string } }) {
  const [editorValue, setEditorValue] = useState<string>("");
  const [httpMethod, setHttpMethod] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [desc, setDesc] = useState<string | undefined>(undefined);
  const [enabledButton, setEnabledButton] = useState(false);
  const [useHeaderAuthorization, setUseHeaderAuthorization] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fields, setFields] = useState<RequestBodyFieldRule[]>();

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
        requestbodyFields: fields,
        useHeaderAuthorization: useHeaderAuthorization,
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
      console.log(error);
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
    <NewEndpointForm
      handleUploadJson={handleUploadJson}
      setName={setName}
      setHttpMethod={setHttpMethod}
      setDesc={setDesc}
      httpMethod={httpMethod}
      setFields={setFields}
      setEditorValue={setEditorValue}
      setUseHeaderAuthorization={setUseHeaderAuthorization}
      editorValue={editorValue}
      handleOnChangeEditor={handleOnChangeEditor}
      handleEditorValidation={handleEditorValidation}
      loading={loading}
      enabledButton={enabledButton}
    />
  );
}
