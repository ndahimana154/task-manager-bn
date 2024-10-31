import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import taskRepositories from "../repositories/taskRepositories";

export const isTaskAlreadyExists = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const task: any = await taskRepositories.findTaskByAttribute("title", req.body.title);
        if (task && task.status === "Pending") {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: "Task with this title already exists"
            });
        }
        return next();
    } catch (error: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

export const isTaskExists = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const id = req.params.id || req.body._id
        const task: any = await taskRepositories.findTaskByAttribute("_id", id);
        if (!task) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: "Task not found!"
            });
        }
        req.task = task;
        return next();
    } catch (error: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}