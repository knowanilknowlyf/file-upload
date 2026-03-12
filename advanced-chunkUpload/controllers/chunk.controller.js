import fs from "fs";
import path from "path";

export const uploadChunks = async (req, res) => {
  const { fileId, chunkIndex } = req.headers;
  const chunkDir = `uploads/temp/${fileId}`;
  if (!fs.existsSync(chunkDir)) {
    fs.mkdirSync(chunkDir, { recursive: true });
  }

  const chunkPath = path.join(chunkDir, `chunk-${chunkIndex}`);
  const stream = fs.createWriteStream(chunkPath);
  let uploadedBytes = 0;
  const fileSize = parseInt(totalSize);
  //   const totalBytes = req.headers["content-length"];
  req.on("data", (chunk) => {
    uploadedBytes += chunk.length;
    const progress = (uploadedBytes / fileSize) * 100;
    console.log(`Upload progress: ${progress.toFixed(2)}%`);
    stream.write(chunk);
  });
  re
  // req.pipe(stream)
  req.on("end", () => {
    stream.end();
    console.log("Chunk uploaded");
    res.json({
      message: "Chunk Uploaded",
    });
  });
  req.on("error", (error) => {
    console.error(error);
    res.status(500).send("Upload Failed");
  });
};
