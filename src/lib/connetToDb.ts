import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        console.log('in connectToDb function');
        console.log('this is mongo url ', process.env.NEXT_PUBLIC_MONGO_DB_URL)
        if (process.env.NEXT_PUBLIC_MONGO_DB_URL) {
            await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_DB_URL);
            console.log("Connected to mongodb");

        }
    } catch (error) {
        console.log("Errow while connecting to MONGODB : " + error);
    }
};

export default connectToDb;