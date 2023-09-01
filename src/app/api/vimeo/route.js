import { NextResponse } from "next/server";

import vimeoDownload from "@/app/utils/vimeoDownload";

export async function POST(req) {
  const { url, quality } = await req.json();

  let configLink;
  try {
    const videoId = url.match(/\d+/g);
    configLink = `https://player.vimeo.com/video/${videoId[0]}/config`;
  } catch (e) {
    return NextResponse.json(
      { message: "There was an error, please try again" },
      { status: 500 }
    );
  }
  try {
    await vimeoDownload(configLink, quality);

    return NextResponse.json({ message: "Video downloaded" });
  } catch (e) {
    return NextResponse.json(
      { message: "There was an error, please try again" },
      { status: 500 }
    );
  }
}
