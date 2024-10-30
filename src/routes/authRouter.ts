import express from 'express';
import { loginUserSchema, registerUserSchema } from '../validations/authValidations';
import { isUserAlreadyExists, isUserExists } from '../middlewares/authMiddlewares';
import authControllers from '../controllers/authControllers';
import { bodyValidation } from '../helpers/bodyValidation';

const authRoute = express.Router();

authRoute.post("/register", bodyValidation(registerUserSchema), isUserAlreadyExists, authControllers.registerUser);
authRoute.post("/login", bodyValidation(loginUserSchema), isUserExists, authControllers.loginUser)

export default authRoute;
