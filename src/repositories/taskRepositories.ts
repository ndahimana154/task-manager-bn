import Task from "../database/models/task";

const findAllTasks = async (user: any) => {
    return await Task.find({ user, status: { $ne: "Deleted" } }).exec();
};


const createTask = async (data: any) => {
    return await Task.create(data);
}

const findTaskByAttribute = async (key: string, value: string) => {
    return await Task.findOne({ [key]: value }).exec();
}

const deleteUserTaskById = async (_id: String) => {
    return await Task.findOneAndDelete({ _id }).exec();
}

const updateUserTaskById = async (_id: String, data: any) => {
    return await Task.findOneAndUpdate({ _id }, data, { new: true }).exec();
}

export default {
    findAllTasks,
    createTask,
    findTaskByAttribute,
    deleteUserTaskById,
    updateUserTaskById,
}