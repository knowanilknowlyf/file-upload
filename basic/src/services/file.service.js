import fs from "fs"
import path from "path";

export const download = (res, filename) => {
    //  if (!filename || typeof filename !== "string") {
    //     res.status(400).send("Invalid filename");
    //     return;
    // }
    // console.log(filename)
    // const filePath = path.join("uploads/", filename)
    // res.download(filePath)
// const filename = req.params.filename;
    const filePath = path.join("uploads", filename);

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.status(404).send("File not found");
            return;
        }
        const totalBytes = stats.size;
        let sentBytes = 0;

        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'application/octet-stream');

        const readStream = fs.createReadStream(filePath);
        readStream.on('data', (chunk) => {
            sentBytes += chunk.length;
            const percent = ((sentBytes / totalBytes) * 100).toFixed(2);
            console.log(`Download progress: ${percent}%`);
        });

        readStream.on('end', () => {
            console.log('Download complete');
        });
        res.download(filePath)
    })
}

export const stream = (res, filename) => {
    if (!filename || typeof filename !== "string") {
        res.status(400).send("Invalid filename");
        return;
    }
    const filePath = path.join("uploads/",filename);
    console.log(filename)
    const stream = fs.createReadStream(filePath)
    stream.pipe(res)
}