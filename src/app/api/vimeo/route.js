import { NextResponse } from "next/server";

import vimeoDownload from "@/app/utils/vimeoDownload";

export async function POST(req) {
  // 409999884 ESTE ANDA

  const { url } = await req.json();
  const videoId = url.match(/\d+/g);
  const configLink = `https://player.vimeo.com/video/${videoId[0]}/config`;

  try {
    await vimeoDownload(configLink);

    return NextResponse.json({ message: "Video downloaded" });
  } catch (e) {
    return NextResponse.json(
      { message: "There was an error" },
      { status: 500 }
    );
  }
}
