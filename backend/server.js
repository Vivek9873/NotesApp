
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./config/database.js";
import authRouter from "./routes/auth-routes.js";
import userRouter from "./routes/user-routes.js";
import notesRouter from "./routes/notes-route.js";
dotenv.config();

const PORT = process.env.PORT || 3000;
connectToDB();
const app = express();
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,

}))
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);
app.use("/api/user", userRouter);
app.use((err, req, res, next) => {
    console.error("Error: ", err.message);

    res.status(err.status || 500).json({
        message: err.message || "Something went wrong"
    });
});



app.listen(PORT, () => console.log("Server is now running at ", PORT));