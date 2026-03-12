import * as fileService from "../services/file.service.js";

export const uploadFile = (req, res) => {
    let uploadedBytes = 0;
    const totalBytes = req.headers['content-length'];
    req.on('data', (chunk) => {
        uploadedBytes += chunk.length;
        const progress = (uploadedBytes / totalBytes) * 100;
        console.log(`Upload progress: ${progress.toFixed(2)}%`);

    });
    req.on('end', () => {
        console.log('Upload complete');
    })
    const file = req.file
    res.json({
        message: "File uploaded successfully",
        file
    })
}
export const uploadFiles = (req, res) => {
    const files = req.files
    res.json({
        message: "File uploaded successfully",
        files
    })
}
export const downloadFile = (req, res) => {
    console.log("param",req.params.filename)
    const filename = req.params.filename
    fileService.download(res, filename)
}
export const streamFile = (req, res) => {
    const filename = req.params.filename
    fileService.stream(res, filename)
}

