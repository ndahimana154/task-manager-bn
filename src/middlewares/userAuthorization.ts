import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { decodeToken } from "../helpers/authHelpers";
import authRepositories from "../repositories/authRepositories";


export const userAuthorization = function (roles: string[]) {
    return async (req: any, res: Response, next: NextFunction): Promise<any> => {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) {
                return res
                    .status(httpStatus.UNAUTHORIZED)
                    .json({ status: httpStatus.UNAUTHORIZED, message: "Not authorized" });
            }

            const decoded: any = await decodeToken(token);

            const session = await authRepositories.findSessionByUserIdAndToken(
                decoded._id, token
            );

            if (!session) {
                return res
                    .status(httpStatus.UNAUTHORIZED)
                    .json({ status: httpStatus.UNAUTHORIZED, message: "Not authorized" });
            }

            const user = await authRepositories.findUserByAttribute("_id", decoded._id);
            if (!user) {
                return res
                    .status(httpStatus.UNAUTHORIZED)
                    .json({ status: httpStatus.UNAUTHORIZED, message: "Not authorized" });
            }

            req.user = user;
            req.session = session;
            next();
        } catch (error: any) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            });
        }
    };
};