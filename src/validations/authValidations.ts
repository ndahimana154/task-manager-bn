import Joi from "joi";

export const registerUserSchema = Joi.object({
    names: Joi.string(),
    email: Joi.string().email().required(),
    phone: Joi.string(),
    password: Joi.string().required().min(8),
    confirmPassword: Joi.ref('password')
})

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})