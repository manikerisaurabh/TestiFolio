import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        if (process.env.MONGO_DB_URL) {
            await mongoose.connect(process.env.MONGO_DB_URL);
            console.log("Connected to mongodb");

        }
    } catch (error) {
        console.log("Errow while connecting to MONGODB : " + error);
    }
};

export default connectToDb;