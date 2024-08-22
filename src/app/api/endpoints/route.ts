import ImageKitHelper from "@/helper/imagekit_helper";
import { NextResponse } from "next/server";
import { v4 } from "uuid";

export async function GET() {
  return NextResponse.json({
    hello: "this is endpoint",
  });
}

export async function POST(req: Request, res: Response) {
  try {
    const imageKitHelper = ImageKitHelper.getInstance();
    const { jsonstr } = await req.json();
    const uuid = v4();
    const fileName = `${uuid}.json`;

    const result = await imageKitHelper.uploadJsonString(jsonstr, fileName);
    console.log("Upload result:", result);
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    const result = (error as Error).message;
    return NextResponse.json({ error: result }, { status: 500 });
  }
}
