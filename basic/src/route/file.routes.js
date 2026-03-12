import express from "express";

import {
    uploadFile,
    uploadFiles,
    downloadFile,
    streamFile
} from '../controller/file.controller.js'
import upload from "../middleware/upload.middleware.js";

const router = express.Router()
router.post("/upload", upload.single("file"), uploadFile);
router.post("/upload-multiple", upload.array("files", 5), uploadFiles)
router.get("/download/:filename", downloadFile)
router.get("/stream/:filename", streamFile)
export default router