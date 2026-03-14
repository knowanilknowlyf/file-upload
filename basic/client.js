const uploadBtn = document.getElementById("uploadBtn");

const fileInput = document.getElementById("fileInput");

const progressBar = document.getElementById("progressBar");

const statusText = document.getElementById("status");
const CHUNK_SIZE = 1024 * 1024; // 1MB
const MAX_PARALLEL = 5;
const MAX_RETRY = 3;

uploadBtn.addEventListener("click", async () => {
  const file = fileInput.files[0];

  if (!file) {
    alert("Select a file first");

    return;
  }

  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

  const fileId = Date.now().toString();
  let uploadedChunks = 0;
  statusText.innerText = "Uploading...";
  const queue = [];

  for (let i = 0; i < totalChunks; i++) {
    queue.push(i);
  }
  async function worker() {
    while (queue.length) {
      const chunkIndex = queue.shift();
      const start = chunkIndex * CHUNK_SIZE;
      const end = start + CHUNK_SIZE;
      const chunk = file.slice(start, end);

      uploadChunkWithRetry(chunk, chunkIndex, fileId, file.size);
      uploadedChunks++;
      const percent = Math.round((uploadedChunks / totalChunks) * 100);

      progressBar.style.width = percent + "%";

      statusText.innerText = `Uploading ${percent}%`;
    }
  }
  const workers = [];
  for (let i = 0; i < MAX_PARALLEL; i++) {
    workers.push(worker());
  }
  await Promise.all(workers);
  await finalizeUpload(fileId, totalChunks, file.name);
  console.log("upload complete");
  statusText.innerText = "Upload Complete!";
});
const finalizeUpload = async (fileId, totalChunks, filename) => {
  await fetch("http://localhost:3200/api/files/merge-chunks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileId: fileId,
      totalChunks: totalChunks,
      filename: filename,
    }),
  });
};
const uploadChunkWithRetry = async (chunk, chunkIndex, fileId, totalSize) => {

  let retries =0
  while(retries<MAX_RETRY){
    try {
        await fetch("http://localhost:3200/api/files/upload-chunk", {
      method: "POST",
      headers: {
        fileId: fileId,
        chunkIndex: chunkIndex,
        totalSize: totalSize,
      },

      body: chunk,
    });
    } catch (error) {
      retries++
      console.log(`trying with${chunkIndex} chunk ${retries} time`)
      if (retries===MAX_RETRY) {
        throw new Error("Chunk upload Failed");       
      }
    }
  }
};
