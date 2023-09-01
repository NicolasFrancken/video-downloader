import path from "path";
import fs from "fs";
import ytdl from "ytdl-core";

export default async function youtubeVideoDownload(url, quality) {
  const output = path.join(__dirname, "../../../../../src/temp/video.mp4");

  const video = ytdl(url, { quality: quality });

  console.log("\nDownloading video\n");

  video.pipe(fs.createWriteStream(output));

  return new Promise(async (resolve, reject) => {
    video.on("end", () => {
      console.log("Video download completed!");
      resolve();
    });

    video.on("error", (e) => {
      console.error("Error while downloading");
      reject();
    });
  });
}
