import { Request, Response } from "express";
import httpStatus from "http-status";
import taskRepositories from "../repositories/taskRepositories";

const createNewTask = async (req: any, res: Response): Promise<any> => {
    try {
        req.body.user = req.user._id;
        req.body.status = "Pending"
        const newTask = await taskRepositories.createTask(req.body);
        return res.status(httpStatus.CREATED).json({
            status: httpStatus.CREATED,
            message: "Task created successfully",
            data: {
                task: newTask
            }
        });
    } catch (error: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
}

const getUserTasks = async (req: any, res: Response): Promise<any> => {
    try {
        const tasks = await taskRepositories.findAllTasks(req.user._id);
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "Tasks fetched successfully",
            data: {
                tasks
            }
        });
    } catch (error: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

const deleteUserTask = async (req: any, res: any): Promise<any> => {
    try {
        await taskRepositories.deleteUserTaskById(req.params.id);
        return res.status(httpStatus.NO_CONTENT).json({
            status: httpStatus.NO_CONTENT,
            message: "Task deleted successfully"
        });
    } catch (error: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
}

const updateUserTask = async (req: any, res: any): Promise<any> => {
    try {
        const updatedTask = await taskRepositories.updateUserTaskById(req.body._id, req.body);
        console.log(updatedTask)
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "Task updated successfully",
            data: {
                task: updatedTask
            }
        });
    } catch (error: any) {
        console.log(error.message)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

export default {
    createNewTask,
    getUserTasks,
    deleteUserTask,
    updateUserTask
}