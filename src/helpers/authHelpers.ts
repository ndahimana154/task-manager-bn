import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcrypt"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || ""

export const generateToken = (_id: string) => {
    return jwt.sign({ _id }, JWT_SECRET);
};

export const decodeToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
        ;
};

export const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
}

export const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, 10);
}
