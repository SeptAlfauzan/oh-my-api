import ImageKit from "imagekit";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
const env = process.env;

export default class ImageKitHelper {
  private static instance: ImageKitHelper;
  private imagekit: ImageKit;

  private constructor() {
    this.imagekit = new ImageKit({
      publicKey: env["NEXT_PUBLIC_IMAGEKIT_PUB"] ?? "",
      privateKey: env["NEXT_PUBLIC_IMAGEKIT_PRIVATE"] ?? "",
      urlEndpoint: env["NEXT_PUBLIC_IMAGEKIT_ENDPOINT"] ?? "",
    });
  }

  public static getInstance(): ImageKitHelper {
    if (!ImageKitHelper.instance) {
      ImageKitHelper.instance = new ImageKitHelper();
    }

    return ImageKitHelper.instance;
  }

  public async uploadImage(file: File): Promise<UploadResponse> {
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    try {
      const result = await this.imagekit.upload({
        file: buffer,
        fileName: file.name,
      });
      console.log("Upload successful:", result);
      return result;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  }

  public async uploadJsonString(
    jsonString: string,
    fileName: string
  ): Promise<UploadResponse> {
    // Convert the JSON string to a Buffer
    const buffer = Buffer.from(jsonString, "utf-8");

    try {
      const result = this.imagekit.upload({
        file: buffer,
        fileName: fileName,
        // Ensure the file is recognized as JSON
        useUniqueFileName: true,
        tags: ["json"],
      });
      console.log("JSON upload successful:", result);
      return result;
    } catch (error) {
      console.error("JSON upload failed:", error);
      throw error;
    }
  }
}
