import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hello: "this is test endpoint",
  });
}

export async function POST(req: NextRequest, res: Response) {
  try {
    const formData = await req.formData();
    if (!formData.get("file")) throw Error("file null");
    const file: FormDataEntryValue = formData.get("file")!!;

    console.log(formData);

    const fileSize = (file as File).size / 1024; //convert from byte to kilobyte
    return NextResponse.json({
      data: {
        file: (file as File).name,
        filesize: `${Math.round(fileSize * 100) / 100}kb`,
      },
      message: "Success upload file",
    });
  } catch (e) {
    const result = (e as Error).message;
    console.log(e);
    return NextResponse.json({ error: result }, { status: 500 });
  }
}
