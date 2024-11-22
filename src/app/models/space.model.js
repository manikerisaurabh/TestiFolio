import mongoose from 'mongoose';

const spaceSchema = new mongoose.Schema({
    spaceName: {
        type: String,
        required: true
    },
    spaceLogo: {
        type: String,
        required: true
    },
    headerTitle: {
        type: String,
        required: true
    },
    customMessage: {
        type: String,
        required: true
    },
    questions: [
        {
            type: String,
            required: true
        }
    ],
    owner: {
        type: String,
        required: true
    }
})



// Check if the model already exists before defining it
const Space = mongoose.models.Space || mongoose.model("Space", spaceSchema);

export default Space;