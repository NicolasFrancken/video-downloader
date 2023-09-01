const path = require("path");
const fs = require("fs");
const Ffmpeg = require("fluent-ffmpeg");

export default async function combineFiles() {
  const videoInputPath = path.join(
    __dirname,
    "../../../../../src/temp/video.mp4"
  );
  const audioInputPath = path.join(
    __dirname,
    "../../../../../src/temp/audio.mp4"
  );
  const outputPath = path.join(
    __dirname,
    "../../../../../src/uploads/YoutubeVideo.mp4"
  );

  const command = Ffmpeg();

  command.input(videoInputPath);
  command.input(audioInputPath);

  command.outputOptions("-c:v", "copy");
  command.outputOptions("-c:a", "aac");

  command.output(outputPath);

  return new Promise(async (resolve, reject) => {
    command
      .on("end", () => {
        console.log("\nFile saved!");

        fs.unlink(audioInputPath, (e) => {
          if (e) {
            throw e;
          }
        });

        fs.unlink(videoInputPath, (e) => {
          if (e) {
            throw e;
          }
        });

        resolve();
      })
      .on("error", (e) => {
        console.error("There was an error trying to combine files");
        reject();
      });

    command.run();
  });
}
