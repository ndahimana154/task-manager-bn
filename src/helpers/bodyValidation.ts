import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export const bodyValidation =
    (schema: Joi.ObjectSchema | Joi.ArraySchema) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { error } = schema.validate(req.body, { abortEarly: false });

                if (error) {
                    throw new Error(
                        error.details
                            .map((detail) => detail.message.replace(/"/g, ""))
                            .join(", ")
                    );
                }
                return next();
            } catch (error: any) {
                res
                    .status(httpStatus.BAD_REQUEST)
                    .json({ status: httpStatus.BAD_REQUEST, message: error.message });
            }
        };