import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import authRepositories from "../repositories/authRepositories";

export const isUserAlreadyExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await authRepositories.findUserByAttribute("email", req.body.email);
        if (user) {
            res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: "User with this email already exists"
            });
        } else {
            next();
        }
    } catch (error: any) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error instanceof Error ? error.message : "Something went wrong"
        });
    }
};

export const isUserExists = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await authRepositories.findUserByAttribute("email", req.body.email);
        if (!user) {
            res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: "User not found"
            });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error instanceof Error ? error.message : "Something went wrong"
        })
    }
}
