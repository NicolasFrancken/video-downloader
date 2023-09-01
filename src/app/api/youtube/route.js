import { NextResponse } from "next/server";

import youtubeVideoDownload from "@/app/utils/youtubeVideoDownload";
import youtubeAudioDownload from "@/app/utils/youtubeAudioDownload";
import combineFiles from "@/app/utils/combineFiles";

export async function POST(req) {
  const { url } = await req.json();
  try {
    await youtubeVideoDownload(url);
    await youtubeAudioDownload(url);
    await combineFiles();

    return NextResponse.json({ message: "Video downloaded" });
  } catch (e) {
    return NextResponse.json(
      { message: "There was an error" },
      { status: 500 }
    );
  }
}
