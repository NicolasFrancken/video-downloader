import path from "path";
import fs from "fs";
import ytdl from "ytdl-core";

export default async function youtubeAudioDownload(url) {
  try {
    const output = path.join(__dirname, "../../../../../src/temp/audio.mp4");

    const video = ytdl(url, { quality: "highestaudio" });

    console.log("\nDownloading audio\n");

    video.pipe(fs.createWriteStream(output));

    return new Promise(async (resolve, reject) => {
      video.on("end", () => {
        console.log("Audio download completed!");
        resolve();
      });

      video.on("error", (e) => {
        console.error("Error while downloading");
        reject();
      });
    });
  } catch (e) {
    throw e;
  }
}
