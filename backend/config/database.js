import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDb Connected Successfully!")
    }
    catch (e) {
        console.log("Database Connection Failed due to ", e);
    }
}

export default connectToDB;