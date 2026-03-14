import fs from "fs";
import path from "path";
import { mergeChunksAsync } from "../utils/mergeChunks.util.js";

export const uploadChunks = async (req, res) => {
  const { fileid, chunkindex } = req.headers;

  const chunkDir = `uploads/temp/${fileid}`;
  if (!fs.existsSync(chunkDir)) {
    fs.mkdirSync(chunkDir, { recursive: true });
  }

  const chunkPath = path.join(chunkDir, `chunk-${chunkindex}`);
  const stream = fs.createWriteStream(chunkPath);
  req.on("data", (chunk) => {
    stream.write(chunk);
  });

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

export const finalizeUpload = async (req, res) => {
  const { fileId, totalChunks, filename } = req.body;
  await mergeChunksAsync(fileId, totalChunks, filename);
  res.json({
    message: "File Upload Complete",
  });
};
