import express from "express";
import { uploadChunks,finalizeUpload } from "../controllers/chunk.controller.js";

const router = express.Router();
router.post("/upload-chunk",uploadChunks);
router.post("/merge-chunks",finalizeUpload)
export default router
