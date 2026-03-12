import express from 'express';
import fileRoutes from './route/file.routes.js'

const app = express()
app.use(express.json())
app.use("/api/files",fileRoutes)
export default app