import { ApiEndpointOutput } from "@/interfaces";
import { FieldType } from "@prisma/client";

export function appendRecordToFormData(
  apiEndpointOutput: ApiEndpointOutput,
  record: Record<string, any>
): FormData {
  const formData = new FormData();

  for (const requiredRequestBody of apiEndpointOutput.requestBodyRules) {
    console.log(record[requiredRequestBody.field_name]);
    if (requiredRequestBody.field_type == FieldType.FILE) {
      // Assuming 'file' is a File object or a Blob
      // If it's a string path, you'll need to convert it to a File or Blob first
      const fileName = record[requiredRequestBody.field_name].split("\\").pop(); // Extract file name from path
      formData.append(requiredRequestBody.field_name, new Blob([]), fileName);
    } else {
      formData.append(
        requiredRequestBody.field_name,
        record[requiredRequestBody.field_name]
      );
    }
  }

  console.log(formData);
  return formData;
}
