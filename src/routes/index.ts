import express from "express"
import authRoute from "./authRouter"
import taskRoute from "./taskRouter";

const router = express.Router()

router.use("/auth", authRoute);
router.use("/task", taskRoute);

export default router