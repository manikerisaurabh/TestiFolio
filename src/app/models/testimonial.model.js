import mongoose from "mongoose";

const testiMonialSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    rating: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    userImage: {
        type: String,
    },
    permissionToShare: {
        type: Boolean,
        required: true,
    },
    spaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Space",
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
    testimonialType: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const TestiMonial = mongoose.models.TestiMonial || mongoose.model("TestiMonial", testiMonialSchema);

export default TestiMonial;
