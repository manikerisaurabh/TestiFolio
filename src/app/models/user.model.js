import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true, // Ensure no duplicate user IDs
    },
    userName: {
        type: String,
        required: true,
    },
});

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
