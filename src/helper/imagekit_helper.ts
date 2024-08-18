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
}
