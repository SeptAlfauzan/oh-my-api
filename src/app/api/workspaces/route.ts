import ImageKitHelper from "@/helper/imagekit_helper";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: "welcome to workspace endpoint" });
}

export async function POST(req: Request, res: Response) {
  try {
    const imageKit = ImageKitHelper.getInstance();
    const result = {};
    return NextResponse.json({ message: "success", data: result });
  } catch (error) {
    // return NextResponse.status(500).json({ message: error });
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
