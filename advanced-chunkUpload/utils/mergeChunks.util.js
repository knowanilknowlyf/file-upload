import fs from "fs";
import path from "path";
export const mergeChunks = async (fileId, totalChunks, filename) => {
  const chunkDir = `uploads/temp/${fileId}`;
  const finalPath = `uploads/${filename}`;
  const writeStream = fs.createWriteStream(finalPath)
  for (let i = 0; i < totalChunks; i++) {
    const element = array[i];
    
  }
};
