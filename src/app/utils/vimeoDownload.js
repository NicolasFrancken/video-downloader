import https from "https";
import fs from "fs";
import path from "path";

export default async function vimeoDownload(configLink, quality) {
  const videoConfig = await new Promise((resolve, reject) => {
    https.get(configLink, (page) => {
      let result = "";
      page.on("data", (data) => {
        result += data;
      });
      page.on("error", (e) => {
        reject();
      });
      page.on("end", () => {
        resolve(JSON.parse(result));
      });
    });
  });

  const videoQualityItems = videoConfig.request.files.progressive;

  const desiredQuality = quality;
  const videoWithDesiredQuality = videoQualityItems.find(
    (videoQuality) => videoQuality.quality === desiredQuality
  );

  let targetVideoFileUrl;
  if (videoWithDesiredQuality) {
    targetVideoFileUrl = videoWithDesiredQuality.url;
  } else {
    throw e;
  }

  const output = path.join(
    __dirname,
    "../../../../../src/uploads/VimeoVideo.mp4"
  );

  await new Promise((resolve, reject) => {
    https.get(targetVideoFileUrl, (vid) => {
      console.log("\nDownloading video\n");
      vid.pipe(fs.createWriteStream(output));
      vid.on("error", (e) => {
        reject();
      });
      vid.on("end", () => {
        console.log("Video downloaded");
        resolve();
      });
    });
  });
}
