import mongoose from 'mongoose';
interface usersAttributes {
    names?: string;
    email: string;
    phone?: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    names: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phone: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
