import Joi from "joi";

export const newTaskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
})

export const updatedTaskSchema = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
    status: Joi.string().valid('Pending', 'Progress', 'Completed', 'Deleted')
})