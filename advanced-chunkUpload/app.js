import express from 'express';
import cors from "cors";
import router from './routes/chunks.routes.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/files",router)
export default app