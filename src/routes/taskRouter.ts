import express from 'express';
import { userAuthorization } from '../middlewares/userAuthorization';
import { bodyValidation } from '../helpers/bodyValidation';
import { newTaskSchema, updatedTaskSchema } from '../validations/tasksValidations';
import { isTaskAlreadyExists, isTaskExists } from '../middlewares/taskMiddlewares';
import taskControllers from '../controllers/taskControllers';

const taskRoute = express.Router();

taskRoute.post("/create-new-task", userAuthorization(["user"]), bodyValidation(newTaskSchema), isTaskAlreadyExists, taskControllers.createNewTask)
taskRoute.get("/all", userAuthorization(["user"]), taskControllers.getUserTasks);
taskRoute.delete("/:id", userAuthorization(["user"]), isTaskExists, taskControllers.deleteUserTask)
taskRoute.put("/", userAuthorization(["user"]), bodyValidation(updatedTaskSchema), isTaskExists, taskControllers.updateUserTask)

export default taskRoute