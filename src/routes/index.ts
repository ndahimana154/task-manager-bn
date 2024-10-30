import express from "express"
import authRoute from "./authRouter"

const router = express.Router()

router.use("/auth", authRoute);
export default router