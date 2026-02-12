import mongoose from "mongoose";

const MosqueSchema = new mongoose.Schema({
     name: {
        type: String,
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    }
})
const Mosque = mongoose.model("Mosque", MosqueSchema)
export default Mosque;