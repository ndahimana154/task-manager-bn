import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan"
import router from "./routes";
import dbConnection from "./database/config/config";

dotenv.config();

const app = express();

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"))
app.use("/api", router);

const port = process.env.PORT || 3000;

dbConnection;

app.listen(port, () => console.log("App listening on port " + port));
