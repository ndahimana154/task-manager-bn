import User from "../database/models/user";
import Session from "../database/models/session";

const findUserByAttribute = async (key: string, value: string) => {
    const user = await User.findOne({ [key]: value });
    return user;
}

const saveUser = async (data: any) => {
    const user = new User(data);
    await user.save();
    return user;
}

const saveSession = async (data: any) => {
    const session = new Session(data);
    await session.save();
    return session;
}

const findSessionByUserIdAndToken = async (userId: string, token: string) => {
    return await Session.findOne({
        userId: userId, content: token
    })
}

export default {
    findUserByAttribute,
    saveUser,
    saveSession,
    findSessionByUserIdAndToken
}