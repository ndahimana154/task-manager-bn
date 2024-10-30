import { Request, Response } from "express";
import httpStatus from "http-status";
import authRepositories from "../repositories/authRepositories";
import { comparePassword, generateToken, hashPassword } from "../helpers/authHelpers";

const registerUser = async (req: Request, res: Response): Promise<any> => {
    try {
        req.body.password = hashPassword(req.body.password);
        const user = await authRepositories.saveUser(req.body);
        return res.status(httpStatus.CREATED).json({
            status: httpStatus.CREATED,
            message: "User registered successfully",
            data: { user }
        });
    } catch (error: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error instanceof Error ? error.message : "An unexpected error occurred"
        });
    }
};

const loginUser = async (req: any, res: Response): Promise<any> => {
    try {
        if (!req.user) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: httpStatus.UNAUTHORIZED,
                message: "User not found",
            });
        }

        const isPasswordMatching = await comparePassword(req.body.password, req.user.password);

        if (!isPasswordMatching) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: httpStatus.UNAUTHORIZED,
                message: "Incorrect password!",
            });
        }

        const token = generateToken(req.user._id);
        const session = await authRepositories.saveSession({ userId: req.user._id, content: token });

        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "User logged in successfully",
            data: { session, token },
        });

    } catch (error) {
        if (!res.headersSent) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: httpStatus.UNAUTHORIZED,
                message: error instanceof Error ? error.message : "An unexpected error occurred",
            });
        }
        console.error("Error occurred after response was sent:", error);    
    }
};

export default {
    registerUser,
    loginUser
};
