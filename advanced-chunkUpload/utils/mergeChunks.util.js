import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
export const mergeChunksSync = async (fileId, totalChunks, filename) => {
  const chunkDir = `uploads/temp/${fileId}`;
  const finalPath = `uploads/${filename}`;
  const writeStream = fs.createWriteStream(finalPath);
  for (let i = 0; i < totalChunks; i++) {
    const chunkPath = path.join(chunkDir, `chunk-${i}`);
    const data = fs.readFileSync(chunkPath);
    writeStream.write(data);
    fs.unlinkSync(chunkPath);
  }
  writeStream.end();
  fs.rmdirSync(chunkDir);
};
export const mergeChunksAsync = async (fileId, totalChunks, filename) => {
  const chunkDir = `uploads/temp/${fileId}`;
  const finalPath = `uploads/${filename}`;
  const writeStream = fs.createWriteStream(finalPath);
  totalChunks = parseInt(totalChunks)
  for (let i = 0; i < totalChunks; i++) {
    const chunkPath = path.join(chunkDir, `chunk-${i}`);
    await new Promise((resolve,reject)=>{
      const readStream = fs.createReadStream(chunkPath);
      readStream.pipe(writeStream,{end:false})
      readStream.on("end",async () => {
        await fs.promises.unlink(chunkPath);
        resolve()
      })
      readStream.on("error",reject)
    })
 
  }
  writeStream.end();
  await fs.promises.rmdir(chunkDir);
};
