import { HEADER_AUTHORIZATION_FIELD } from "@/constanta";
import Fetch from "@/helper/fetch";
import { ApiEndpointOutput } from "@/interfaces";
import { appendRecordToFormData } from "@/utils/form_data";
import { FieldType, HttpMethod } from "@prisma/client";
import { useCallback, useState } from "react";

export const useHandlerExecutionAPI = () => {
  const [editorData, setEditorData] = useState<string>("");
  const [status, setStatus] = useState<number>(200);
  const performExecution = useCallback(
    async (
      id: string,
      data: ApiEndpointOutput | undefined,
      formValue: Record<string, any>
    ) => {
      setEditorData(JSON.stringify({ data: "fetching..." }));
      try {
        let result: Response;
        const headers = new Headers({
          Authorization: formValue[HEADER_AUTHORIZATION_FIELD],
        });

        switch (data?.httpMethod) {
          case HttpMethod.GET:
            result = await fetch(
              `${window.location.origin}/api/end-to-end?id=${id}`,
              {
                method: "GET",
                headers,
              }
            );
            break;
          case HttpMethod.POST:
            const haveFileTypeReqBody =
              data?.requestBodyRules.some(
                (reqBody) => reqBody.field_type === FieldType.FILE
              ) ?? false;

            let body: FormData | string;
            if (haveFileTypeReqBody) {
              body = appendRecordToFormData(data, formValue);
            } else {
              body = JSON.stringify(formValue);
              headers.append("Content-Type", "application/json");
            }

            result = await fetch(
              `${window.location.origin}/api/end-to-end?id=${id}`,
              {
                method: "POST",
                headers,
                body,
              }
            );
            break;
          default:
            throw new Error("Other HTTP method is not implemented yet :(");
        }

        if (!result.ok) throw new Error(result.statusText);

        const responseData = await result.json();
        setEditorData(JSON.stringify(responseData));
        setStatus(result.status);
      } catch (error) {
        console.error(error);
        setStatus(500);
        setEditorData(
          JSON.stringify({
            status: 500,
            error: error instanceof Error ? error.message : String(error),
          })
        );
        throw error;
      }
    },
    []
  );

  return [editorData, status, performExecution] as const;
};
