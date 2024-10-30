import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const mongoURI: string = process.env.MONGO_DB_URL || ""
mongoose.Promise = global.Promise;
const dbConnection = mongoose.connect(mongoURI)
    .then(() => {
        console.log("Successfully connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });


export default dbConnection